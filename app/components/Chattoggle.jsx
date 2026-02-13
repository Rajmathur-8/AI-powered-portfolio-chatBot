// app/components/ChatToggle.jsx
'use client';

import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chattoggle.css';

export default function ChatToggle({ isOpen, onClick }) {
  return (
    <AnimatePresence>
      <motion.button
        className="chat-toggle"
        onClick={onClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            <span className="chat-toggle-badge">AI</span>
          </>
        )}
      </motion.button>
    </AnimatePresence>
  );
}