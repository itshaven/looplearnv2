import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        There was a problem signing you in. Please try again or contact support if the problem persists.
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
