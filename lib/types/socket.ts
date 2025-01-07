// Event types for type safety
export interface ServerToClientEvents {
    'message:receive': (message: Message) => void;
    'user:typing': (data: { userId: string; username: string }) => void;
    'error': (error: { message: string }) => void;
  }
  
  export interface ClientToServerEvents {
    'message:send': (message: Omit<Message, 'id' | 'createdAt'>) => void;
    'channel:join': (channelId: string) => void;
    'channel:leave': (channelId: string) => void;
    'typing:start': (channelId: string) => void;
    'typing:stop': (channelId: string) => void;
  }