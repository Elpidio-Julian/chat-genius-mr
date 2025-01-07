import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      {/* Common navigation header */}
      <nav className="bg-slate-800 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My Dashboard</h1>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>

      {/* Main content area */}
      <main className="p-4">
        {children}
      </main>
    </div>
  );
} 