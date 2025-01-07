'use client';

import { useMessages } from './MessageProvider';
import { useUser } from '@clerk/nextjs';
import { UserAvatar } from './UserAvatar';
import { useRef, useEffect } from 'react';

export default function MessageList() {
  const { messages, currentChannel } = useMessages();
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
      {messages
        .filter((msg) => msg.channelId === currentChannel)
        .map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            <UserAvatar userId={message.userId} />
            <div>
              <div className="flex items-baseline">
                <span className="font-bold text-white">{message.username}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
                {message.userId === user?.id && (
                  <span className="text-xs text-blue-400 ml-2">(You)</span>
                )}
              </div>
              <p className="text-white">{message.content}</p>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
} 