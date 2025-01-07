import { createServer } from 'http';
import { SocketService } from '../lib/socket/socket-server';

const httpServer = createServer();
SocketService.initialize(httpServer);

const port = parseInt(process.env.SOCKET_PORT || '3001', 10);
httpServer.listen(port, () => {
  console.log(`Socket.IO server running on port ${port}`);
}); 