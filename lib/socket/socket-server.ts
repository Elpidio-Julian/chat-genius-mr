import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../types/socket';
import { Message } from '../types/message';

export class SocketService {
  private static io: SocketIOServer | null = null;

  static getInstance(): SocketIOServer {
    if (!this.io) {
      throw new Error('Socket.IO has not been initialized');
    }
    return this.io;
  }

  static initialize(server: NetServer) {
    this.io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL,
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);

      // Handle joining channels
      socket.on('channel:join', (channelId) => {
        socket.join(channelId);
        console.log(`User joined channel: ${channelId}`);
      });

      // Handle leaving channels
      socket.on('channel:leave', (channelId) => {
        socket.leave(channelId);
        console.log(`User left channel: ${channelId}`);
      });

      // Handle new messages
      socket.on('message:send', async (messageData) => {
        try {
          const message: Message = {
            ...messageData,
            id: crypto.randomUUID(),
            createdAt: new Date()
          };

          // Broadcast to all clients in the channel
          this.io?.to(messageData.channelId).emit('message:receive', message);
        } catch (error) {
          console.error('Error handling message:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    console.log('Socket.IO server initialized');
  }
}