// app/components/ChatBot.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2 } from 'lucide-react';
import './ChatBot.css';

/**
 * ChatBot Component
 * 
 * This component manages the conversation with the AI.
 * - Sends user messages to the backend
 * - Receives AI responses and tool calls
 * - Coordinates with ActionExecutor to run tools
 * - Feeds tool results back to the AI for follow-up responses
 */
export default function ChatBot({ onToolCall, isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your portfolio assistant. I can help you navigate this site, answer questions about projects and experience, or even fill out the contact form for you. What would you like to explore?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [executingTools, setExecutingTools] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const extractPageContent = () => {
    const sections = document.querySelectorAll('.section');
    let content = '';
    
    sections.forEach(section => {
      const id = section.id || 'unknown';
      content += `=== ${id.toUpperCase()} ===\n${section.innerText}\n\n`;
    });
    
    return content;
  };

  /**
   * Send a message to the AI
   */
  const sendMessage = async () => {
    if (!input.trim() || loading || executingTools > 0) return;

    const userMessage = { role: 'user', content: input };
    const messageText = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const pageContent = extractPageContent();

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          message: messageText,
          pageContent: pageContent,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get response');
      }

      const data = await response.json();

      // Process the AI response
      await handleAIResponse(data, messageText);

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle the AI response, which may include tool calls
   */
  const handleAIResponse = async (data, originalMessage) => {
    const { message, toolCalls, requiresAction } = data;

    // Show AI message
    if (message) {
      const aiMessage = {
        role: 'assistant',
        content: message,
        isAction: requiresAction
      };
      setMessages(prev => [...prev, aiMessage]);
    }

    // If there are tool calls, execute them
    if (toolCalls && toolCalls.length > 0 && requiresAction) {
      await executeToolCalls(toolCalls, originalMessage, message);
    }
  };

  /**
   * Execute all tool calls from the AI
   */
  const executeToolCalls = async (toolCalls, originalMessage) => {
    try {
      setExecutingTools(toolCalls.length);
      const results = [];

      // Execute each tool call
      for (const toolCall of toolCalls) {
        const result = await executeToolCall(toolCall);
        results.push(result);
        console.log(`Tool ${toolCall.name} result:`, result);
      }

      // Check if any tool failed
      const allSuccessful = results.every(r => r.success);
      console.log('All tools successful:', allSuccessful, 'Results:', results);

      // All tools executed, send results back to AI for follow-up
      setToolResults(results);
      await sendToolResults(results, originalMessage, allSuccessful);
      
      setExecutingTools(0);
      setToolResults([]);
    } catch (error) {
      console.error('Execute tool calls error:', error);
      setExecutingTools(0);
      // Only show error if it's a critical failure, not a response processing issue
      const errorMessage = {
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again.',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  /**
   * Execute a single tool call
   */
  const executeToolCall = async (toolCall) => {
    return new Promise((resolve) => {
      // Call the parent component's onToolCall handler
      // This passes the tool to ActionExecutor for execution
      if (onToolCall) {
        onToolCall(toolCall, (result) => {
          // Tool execution completed
          resolve(result);
        });
      } else {
        resolve({
          success: false,
          message: 'No tool executor available'
        });
      }
    });
  };

  /**
   * Send tool execution results back to the AI for follow-up response
   */
  const sendToolResults = async (results, originalMessage, allToolsSucceeded = true) => {
    try {
      console.log('Sending tool results:', results);
      
      const response = await fetch('/api/chat', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          toolResults: results,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', response.status, errorText);
        
        // If tools executed successfully, acknowledge that even if follow-up fails
        if (allToolsSucceeded) {
          const successMessage = {
            role: 'assistant',
            content: 'Done! The action has been completed.',
            isFollowUp: true
          };
          setMessages(prev => [...prev, successMessage]);
          console.log('Tools succeeded, showing success despite backend error');
          return;
        }
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Follow-up response:', data);

      // Process follow-up response from AI
      if (data.message) {
        const followUpMessage = {
          role: 'assistant',
          content: data.message,
          isFollowUp: true
        };
        setMessages(prev => [...prev, followUpMessage]);
      }

      // If there are more tool calls, execute them recursively
      if (data.toolCalls && data.toolCalls.length > 0 && data.requiresAction) {
        await executeToolCalls(data.toolCalls, originalMessage);
      }

    } catch (error) {
      console.error('Tool result error:', error);
      
      // Check if tools actually succeeded
      const allSuccessful = results.every(r => r.success);
      if (allSuccessful) {
        // Don't show error if tools succeeded
        const successMessage = {
          role: 'assistant',
          content: 'Done! The action was completed successfully.',
          isFollowUp: true
        };
        setMessages(prev => [...prev, successMessage]);
      } else {
        const errorMessage = {
          role: 'assistant',
          content: 'I encountered an issue. Please try again.',
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    "Show me the projects",
    "What skills do you have?",
    "Go to contact section",
    "Tell me about your experience"
  ];

  const handleQuickAction = (action) => {
    setInput(action);
    setTimeout(() => sendMessage(), 100);
  };

  if (!isOpen) return null;

  const isWorking = loading || executingTools > 0;

  return (
    <div className={`chatbot ${isMinimized ? 'minimized' : ''}`}>
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-content">
          <Bot className="chatbot-icon" size={24} />
          <div className="chatbot-title">
            <h3>Portfolio Assistant</h3>
            <span className={`chatbot-status ${isWorking ? 'working' : ''}`}>
              {loading && 'Thinking...'}
              {executingTools > 0 && `Executing ${executingTools} action${executingTools > 1 ? 's' : ''}...`}
              {!isWorking && 'Online'}
            </span>
          </div>
        </div>
        <div className="chatbot-controls">
          <button 
            className="chatbot-control-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button 
            className="chatbot-control-btn"
            onClick={onToggle}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`message ${msg.role} ${msg.isAction ? 'action' : ''} ${msg.isError ? 'error' : ''} ${msg.isFollowUp ? 'follow-up' : ''}`}
              >
                <div className="message-avatar">
                  {msg.role === 'user' ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.content}</div>
                </div>
              </div>
            ))}
            
            {isWorking && (
              <div className="message assistant loading">
                <div className="message-avatar">
                  <Bot size={18} />
                </div>
                <div className="message-content">
                  <div className="message-text">
                    <Loader2 className="spinner" size={18} />
                    <span>{loading ? 'Thinking...' : `Executing actions...`}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && !isWorking && (
            <div className="chatbot-quick-actions">
              <div className="quick-actions-label">Quick actions:</div>
              <div className="quick-actions-buttons">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(action)}
                    disabled={isWorking}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="chatbot-input">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about this portfolio..."
              rows="1"
              disabled={isWorking}
            />
            <button 
              onClick={sendMessage} 
              disabled={isWorking || !input.trim()}
              className="send-button"
              title={isWorking ? 'Please wait...' : 'Send message'}
            >
              {isWorking ? (
                <Loader2 className="spinner" size={20} />
              ) : (
                <Send size={20} />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}