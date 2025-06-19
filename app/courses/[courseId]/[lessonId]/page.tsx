import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardShell } from "@/components/dashboard-shell"
import { LessonContent } from "@/components/lesson-content"
import { getLesson } from "@/lib/lessons"
import { getUserProgress } from "@/lib/user-progress"

interface LessonPageProps {
  params: {
    courseId: string
    lessonId: string
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const lesson = await getLesson(params.courseId, params.lessonId)

  if (!lesson) {
    redirect(`/courses/${params.courseId}`)
  }

  const userProgress = await getUserProgress(user.id, params.courseId, params.lessonId)

  return (
    <DashboardShell>
      <LessonContent
        lesson={lesson}
        userProgress={userProgress}
        userId={user.id}
        courseId={params.courseId}
        lessonId={params.lessonId}
      />
    </DashboardShell>
  )
}
