import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getAllCourses } from "@/lib/courses"
import { ArrowRight, Code, FileCode } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseListProps {
  userProgress: any
}

export async function CourseList({ userProgress }: CourseListProps) {
  const courses = await getAllCourses()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const courseProgress = userProgress?.courses?.[course.id] || {
          completedLessons: 0,
          totalLessons: course.lessonCount,
        }

        const progressPercentage = (courseProgress.completedLessons / courseProgress.totalLessons) * 100 || 0

        return (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-md">
                  {course.icon === "code" ? (
                    <Code className="h-5 w-5 text-primary" />
                  ) : (
                    <FileCode className="h-5 w-5 text-primary" />
                  )}
                </div>
              </div>
              <CardTitle className="mt-4">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{course.lessonCount} lessons</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-2">
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <Button asChild className="w-full mt-4">
                  <Link href={`/courses/${course.id}`}>
                    {progressPercentage > 0 ? "Continue" : "Start"} Course
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
