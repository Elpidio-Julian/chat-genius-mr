export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Chat header */}
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold"># general</h2>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Sample messages */}
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-300"></div>
          <div>
            <div className="flex items-baseline">
              <span className="font-bold">User 1</span>
              <span className="text-xs text-gray-500 ml-2">12:00 PM</span>
            </div>
            <p className="text-gray-700">Hello, everyone! 👋</p>
          </div>
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Message #general"
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 