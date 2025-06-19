"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Code } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
        <Code className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">CodeMentor</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/dashboard"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/dashboard" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/courses"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/courses") ? "text-foreground" : "text-foreground/60",
          )}
        >
          Courses
        </Link>
        <Link
          href="/progress"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/progress") ? "text-foreground" : "text-foreground/60",
          )}
        >
          My Progress
        </Link>
      </nav>
    </div>
  )
}
