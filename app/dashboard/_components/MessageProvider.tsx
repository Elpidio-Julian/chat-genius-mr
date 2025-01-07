'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '@/lib/types/message';
import { useUser, useAuth } from '@clerk/nextjs';
import { ClientToServerEvents, ServerToClientEvents } from '@/lib/types/socket';

interface MessageContextType {
  messages: Message[];
  sendMessage: (content: string, channelId: string) => void;
  isConnected: boolean;
  currentChannel: string;
  setCurrentChannel: (channelId: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentChannel, setCurrentChannel] = useState('general');

  useEffect(() => {
    console.log('MessageProvider useEffect - User loaded:', isLoaded, 'User:', user);

    if (!isLoaded || !user) return;

    const connectSocket = async () => {
      const sessionToken = await getToken();

      const socketInstance = io('http://localhost:3001', {
        auth: {
          userId: user.id,
          username: user.username || user.firstName || 'Anonymous',
          sessionToken
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected successfully');
        setIsConnected(true);
        socketInstance.emit('channel:join', currentChannel);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnected(false);
      });

      socketInstance.on('message:receive', (message) => {
        console.log('Received message:', message);
        setMessages((prev) => [...prev, message]);
      });

      socketInstance.on('disconnect', () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    };

    connectSocket();
  }, [user, isLoaded, currentChannel, getToken]);

  const sendMessage = (content: string, channelId: string) => {
    if (!socket || !user) {
      console.error('Cannot send message: socket or user not available');
      return;
    }

    console.log('Sending message:', { content, channelId, userId: user.id });
    socket.emit('message:send', {
      content,
      channelId,
      userId: user.id,
      username: user.username || user.firstName || 'Anonymous',
    });
  };

  console.log('MessageProvider state:', { isConnected, currentChannel, messagesCount: messages.length });

  return (
    <MessageContext.Provider 
      value={{ 
        messages, 
        sendMessage, 
        isConnected, 
        currentChannel, 
        setCurrentChannel 
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useMessages must be used within a MessageProvider');
  return context;
};