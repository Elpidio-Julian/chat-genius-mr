import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Welcome to Next.js with shadcn/ui</h1>
        <Button>Click me</Button>
      </div>
    </main>
  )
}