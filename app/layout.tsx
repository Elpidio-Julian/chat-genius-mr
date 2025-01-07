import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="p-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Chat-Genius</h1>
                <UserButton />
              </div>
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}