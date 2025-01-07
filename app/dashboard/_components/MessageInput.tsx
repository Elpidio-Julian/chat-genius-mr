'use client';

import { useState } from 'react';
import { useMessages } from './MessageProvider';

export default function MessageInput() {
  const [message, setMessage] = useState('');
  const { sendMessage, currentChannel, isConnected } = useMessages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !isConnected) return;

    sendMessage(message, currentChannel);
    setMessage('');
  };

  return (
    <div className="p-4 border-t bg-white">
      {!isConnected && (
        <div className="text-red-500 text-sm mb-2">
          Disconnected from chat server. Trying to reconnect...
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isConnected ? `Message #${currentChannel}` : 'Connecting...'}
          className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          disabled={!isConnected}
        />
        <button 
          type="submit"
          disabled={!isConnected || !message.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          Send
        </button>
      </form>
    </div>
  );
} 