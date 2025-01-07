import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn appearance={{
        elements: {
          formButtonPrimary: 'bg-slate-800 hover:bg-slate-900',
          card: 'rounded-xl shadow-md'
        }
      }}
      afterSignInUrl="/dashboard"
      signUpUrl="/sign-up"
      />
    </div>
  );
} 