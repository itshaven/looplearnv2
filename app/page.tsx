import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <div className="flex items-center gap-2 font-bold">
            <Code className="h-5 w-5" />
            <span>CodeMentor</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Welcome to CodeMentor</h1>
          <p className="text-xl text-gray-600">Learn to code with AI assistance</p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/api/auth/signin/google">Sign in with Google</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
