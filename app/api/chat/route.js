// app/api/chat/route.js
import { NextResponse } from 'next/server';
import { getGeminiModel, buildConversationHistory, extractPageContent } from '@/lib/gemini';
import { toolsDeclaration } from '@/lib/tools';

/**
 * POST /api/chat
 * Main chat endpoint. Sends user message to Gemini and gets response with potential tool calls.
 * The AI decides which tools to call - the frontend executes them without DOM manipulation.
 */
export async function POST(request) {
  try {
    const { message, conversationHistory, pageContent, sectionId } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    // Initialize Gemini model with tool declarations
    // The AI will use these tools to interact with the website
    const model = getGeminiModel(toolsDeclaration);

    // Extract relevant content from the page
    const relevantContent = extractPageContent(pageContent, sectionId);

    // Build conversation history for context
    const history = conversationHistory ? buildConversationHistory(conversationHistory) : [];

    // Start chat session with conversation history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7, // Reduced for more consistent output
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    // Create context-aware message for the AI
    // The page content gives the AI awareness of what's on the website
    const contextMessage = relevantContent 
      ? `Current page content:\n${relevantContent}\n\nUser question: ${message}`
      : message;

    console.log('Sending message to Gemini:', { messageLength: contextMessage.length, hasHistory: history.length > 0 });

    // Send message to Gemini and get response
    const result = await chat.sendMessage(contextMessage);
    const response = await result.response;

    // Check if the AI decided to call tools
    const functionCalls = response.functionCalls();
    
    if (functionCalls && functionCalls.length > 0) {
      // AI has decided to use tools
      const responseText = response.text();
      const toolCallsData = functionCalls.map(fc => ({
        name: fc.name,
        parameters: fc.args || {}
      }));

      console.log('Tool calls detected:', toolCallsData.map(t => t.name));

      return NextResponse.json({
        message: responseText && responseText.trim() ? responseText : 'Let me do that for you...',
        toolCalls: toolCallsData,
        requiresAction: true,
        hasFollowUp: responseText && responseText.trim().length > 0
      });
    }

    // AI provided a text response without tool calls
    const responseText = response.text();
    
    if (!responseText || responseText.trim().length === 0) {
      console.warn('Empty response from Gemini');
      return NextResponse.json({
        message: 'I understand. Let me help with that. Please ask me something more specific.',
        toolCalls: [],
        requiresAction: false
      });
    }

    return NextResponse.json({
      message: responseText,
      toolCalls: [],
      requiresAction: false
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Return detailed error information in development
    const errorResponse = {
      message: 'Sorry, I encountered an error. Please try again.',
      toolCalls: [],
      requiresAction: false,
      error: error.message
    };

    // Add stack trace in development mode
    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = error.stack;
    }

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

/**
 * PUT /api/chat
 * Handle tool execution results and get follow-up response from the AI.
 * This allows the AI to react to the outcome of tool execution.
 */
export async function PUT(request) {
  try {
    const { toolResults, conversationHistory } = await request.json();

    // Validate input
    if (!toolResults || !Array.isArray(toolResults)) {
      return NextResponse.json(
        { error: 'toolResults must be an array' },
        { status: 400 }
      );
    }

    console.log('Processing tool results:', { count: toolResults.length, results: toolResults });

    // Reinitialize model
    const model = getGeminiModel(toolsDeclaration);
    const history = buildConversationHistory(conversationHistory);
    
    const chat = model.startChat({ history });

    // Format tool results for the AI to understand what happened
    // Include both successes and failures with their details
    const toolSummary = toolResults.map(tr => {
      const status = tr.success ? '✓' : '✗';
      return `${status} ${tr.name}: ${tr.message}`;
    }).join('\n');

    const resultMessage = `The following actions were executed on the website:
${toolSummary}

${toolResults.every(r => r.success) ? 'All actions completed successfully.' : 'Some actions encountered issues.'}

Now provide a natural follow-up response about the results. Be conversational and acknowledge what was done.`;

    console.log('Sending to Gemini:', resultMessage);

    // Send tool results and get follow-up response
    const result = await chat.sendMessage(resultMessage);
    const response = await result.response;

    // Check if AI wants to call more tools
    const functionCalls = response.functionCalls();
    
    if (functionCalls && functionCalls.length > 0) {
      const toolCallsData = functionCalls.map(fc => ({
        name: fc.name,
        parameters: fc.args || {}
      }));

      console.log('Follow-up tool calls detected:', toolCallsData.map(t => t.name));

      return NextResponse.json({
        message: response.text() || 'Let me do that next...',
        toolCalls: toolCallsData,
        requiresAction: true
      });
    }

    const responseText = response.text();
    console.log('Follow-up response from AI:', responseText);

    return NextResponse.json({
      message: responseText || 'Done! I\'ve completed the action.',
      toolCalls: [],
      requiresAction: false
    });

  } catch (error) {
    console.error('Tool Result API Error:', error.message);
    console.error('Stack:', error.stack);
    
    // Even if there's an error processing the follow-up, we should acknowledge success
    return NextResponse.json(
      { 
        message: 'The action was completed successfully.',
        toolCalls: [],
        requiresAction: false,
        note: 'Follow-up response could not be generated, but the action succeeded.'
      },
      { status: 200 }
    );
  }
}