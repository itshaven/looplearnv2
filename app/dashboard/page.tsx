import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="p-4 border rounded-md">
        <p>Welcome, {user.name || "User"}!</p>
        <p>You are signed in with {user.email}</p>
        <div className="mt-4">
          <a href="/api/auth/signout" className="text-blue-500 hover:underline">
            Sign out
          </a>
        </div>
      </div>
    </div>
  )
}
