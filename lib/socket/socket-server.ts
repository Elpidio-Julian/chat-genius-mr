import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../types/socket';
import { Message } from '../types/message';
import { createClerkClient } from '@clerk/backend';

export class SocketService {
  private static io: SocketIOServer | null = null;
  private static clerk: ReturnType<typeof createClerkClient>;

  static getInstance(): SocketIOServer {
    if (!this.io) {
      throw new Error('Socket.IO has not been initialized');
    }
    return this.io;
  }

  static initialize(server: NetServer) {
    // Initialize Clerk client with secret key
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error('CLERK_SECRET_KEY is not defined in environment variables');
    }

    this.clerk = createClerkClient({ 
      secretKey: process.env.CLERK_SECRET_KEY 
    });

    console.log('Initializing SocketService with Clerk:', !!this.clerk);

    this.io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server, {
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      },
      transports: ['websocket', 'polling'],
      allowEIO3: true
    });

    // Middleware to verify user
    this.io.use(async (socket, next) => {
      const userId = socket.handshake.auth.userId;
      const sessionToken = socket.handshake.auth.sessionToken;
      
      try {
        console.log('Attempting to verify user:', userId);
        // Verify user exists in Clerk using the class instance
        const user = await this.clerk.users.getUser(userId);
        if (!user) {
          console.error('User not found in Clerk');
          return next(new Error('Unauthorized'));
        }
        
        // Attach user data to socket
        socket.data.user = {
          id: user.id,
          username: user.username || user.firstName || 'Anonymous'
        };
        
        console.log('User verified successfully:', socket.data.user);
        next();
      } catch (error) {
        console.error('Authentication error details:', error);
        next(new Error('Authentication failed'));
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