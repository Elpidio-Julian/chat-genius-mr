import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp appearance={{
        elements: {
          formButtonPrimary: 'bg-slate-800 hover:bg-slate-900',
          card: 'rounded-xl shadow-md'
        }
      }}
      afterSignUpUrl="/dashboard" 
      signInUrl="/sign-in" />
    </div>
  );
} 