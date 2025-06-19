import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CourseContent } from "@/components/course-content"
import { getCourse } from "@/lib/courses"
import { getUserProgress } from "@/lib/user-progress"

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const course = await getCourse(params.courseId)

  if (!course) {
    redirect("/dashboard")
  }

  const userProgress = await getUserProgress(user.id, params.courseId)

  return (
    <DashboardShell>
      <DashboardHeader heading={course.title} text={course.description} />
      <CourseContent course={course} userProgress={userProgress} userId={user.id} />
    </DashboardShell>
  )
}
