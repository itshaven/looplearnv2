import type React from "react"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser } from "@/lib/auth"

interface DashboardShellProps {
  children: React.ReactNode
}

export async function DashboardShell({ children }: DashboardShellProps) {
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          {user && (
            <UserAccountNav
              user={{
                name: user.name,
                image: user.image,
                email: user.email,
              }}
            />
          )}
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
    </div>
  )
}
