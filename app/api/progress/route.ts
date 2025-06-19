import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { courseId, lessonId, progress, completed } = await req.json()

    if (!courseId || !lessonId) {
      return new NextResponse("Course ID and Lesson ID are required", { status: 400 })
    }

    const supabase = createClient()

    // Check if progress entry exists
    const { data: existingProgress } = await supabase
      .from("user_progress")
      .select()
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("lesson_id", lessonId)
      .single()

    if (existingProgress) {
      // Update existing progress
      await supabase
        .from("user_progress")
        .update({
          progress_data: progress,
          completed: completed || existingProgress.completed,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingProgress.id)
    } else {
      // Create new progress entry
      await supabase.from("user_progress").insert({
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        progress_data: progress,
        completed: completed || false,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[PROGRESS_ERROR]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
