import { UserButton } from "@clerk/nextjs";
import AuthCheck from "./_components/AuthCheck";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthCheck />
      <div className="h-screen flex flex-col">
        {/* Nav header */}
        <nav className="bg-slate-800 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">My Dashboard</h1>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </nav>

        {/* Main content area with sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="bg-slate-800 text-white w-64 flex-shrink-0 md:block hidden">
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Channels</h2>
              <ul className="space-y-2">
                <li className="hover:bg-slate-700 p-2 rounded cursor-pointer"># general</li>
                <li className="hover:bg-slate-700 p-2 rounded cursor-pointer"># random</li>
                <li className="hover:bg-slate-700 p-2 rounded cursor-pointer"># support</li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
} 