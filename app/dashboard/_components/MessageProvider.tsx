   // dashboard/_components/MessageProvider.tsx
   import { createContext, useContext, useEffect, useState } from 'react';
   import { io, Socket } from 'socket.io-client';
   import { Message } from '@/types/message';

   export const MessageContext = createContext<{
     messages: Message[];
     sendMessage: (content: string) => void;
   }>(null!);