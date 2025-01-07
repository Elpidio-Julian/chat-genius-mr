import { config } from 'dotenv';
import { resolve } from 'path';
import { createServer } from 'http';
import { SocketService } from '../lib/socket/socket-server';

// Load environment variables from .env.local
config({ 
  path: resolve(process.cwd(), '.env.local'),
  override: true 
});

// Debug environment variables
if (!process.env.CLERK_SECRET_KEY) {
  console.error('CLERK_SECRET_KEY is not set in environment variables');
  process.exit(1);
}

console.log('Environment variables loaded:', {
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? '✓ Present' : '✗ Missing',
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  SOCKET_PORT: process.env.SOCKET_PORT
});

const httpServer = createServer();
SocketService.initialize(httpServer);

const port = parseInt(process.env.SOCKET_PORT || '3001', 10);
httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
});

httpServer.on('error', (error) => {
  console.error('Server error:', error);
}); 