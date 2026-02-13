// app/page.jsx
'use client';

import { useState } from 'react';
import Portfolio from './components/Portfolio';
import ChatBot from './components/ChatBot';
import ActionExecutor from './components/ActionExecutor';
import ChatToggle from './components/Chattoggle';

export default function Home() {
  const [currentToolCall, setCurrentToolCall] = useState(null);
  const [actionCallback, setActionCallback] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleToolCall = (toolCall, callback) => {
    setCurrentToolCall(toolCall);
    setActionCallback(() => callback);
  };

  const handleActionComplete = (result) => {
    if (actionCallback) {
      actionCallback(result);
    }
    // Reset after action completes
    setTimeout(() => {
      setCurrentToolCall(null);
      setActionCallback(null);
    }, 100);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <main className="app-container">
      <Portfolio />
      <ChatBot 
        onToolCall={handleToolCall}
        isOpen={isChatOpen}
        onToggle={toggleChat}
      />
      <ActionExecutor 
        toolCall={currentToolCall}
        onActionComplete={handleActionComplete}
      />
      {!isChatOpen && (
        <ChatToggle 
          isOpen={isChatOpen}
          onClick={toggleChat}
        />
      )}
    </main>
  );
}