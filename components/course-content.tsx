"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, LockIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseContentProps {
  course: any
  userProgress: any
  userId: string
}

export function CourseContent({ course, userProgress, userId }: CourseContentProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        {course.modules.map((module: any) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {module.lessons.map((lesson: any, index: number) => {
                  const isCompleted = userProgress?.lessons?.[lesson.id]?.completed || false
                  const isLocked = index > 0 && !userProgress?.lessons?.[module.lessons[index - 1].id]?.completed

                  return (
                    <div key={lesson.id} className="flex items-center gap-2">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      {isLocked ? (
                        <div className="flex items-center gap-2 py-2 px-3 rounded-md bg-muted">
                          <LockIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{lesson.title}</span>
                        </div>
                      ) : (
                        <Link
                          href={`/courses/${course.id}/${lesson.id}`}
                          className={cn(
                            "flex-1 py-2 px-3 rounded-md hover:bg-muted transition-colors",
                            isCompleted && "text-primary",
                          )}
                        >
                          {lesson.title}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
