   // dashboard/page.tsx
   import { MessageProvider } from './_components/MessageProvider';
   import MessageList from './_components/MessageList';
   import MessageInput from './_components/MessageInput';

   export default function DashboardPage() {
     return (
       <MessageProvider>
         <div className="h-full flex flex-col">
           <div className="border-b p-4">
             <h2 className="text-xl font-semibold"># general</h2>
           </div>
           <MessageList />
           <MessageInput />
         </div>
       </MessageProvider>
     );
   } 