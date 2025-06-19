import { createClient } from "@/lib/supabase/server"

export async function getUserProgress(userId: string, courseId?: string, lessonId?: string) {
  const supabase = createClient()

  try {
    if (courseId && lessonId) {
      // Get progress for a specific lesson
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .eq("lesson_id", lessonId)
        .single()

      if (error) {
        console.error("Error fetching lesson progress:", error)
        return null
      }

      return data
    } else if (courseId) {
      // Get progress for a specific course
      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId)

      if (error) {
        console.error("Error fetching course progress:", error)
        return null
      }

      // Format the data for easier consumption
      const lessons: Record<string, any> = {}
      let completedLessons = 0

      data.forEach((progress) => {
        lessons[progress.lesson_id] = {
          completed: progress.completed,
          progress_data: progress.progress_data,
        }

        if (progress.completed) {
          completedLessons++
        }
      })

      return {
        lessons,
        completedLessons,
      }
    } else {
      // Get progress for all courses
      const { data, error } = await supabase.from("user_progress").select("*").eq("user_id", userId)

      if (error) {
        console.error("Error fetching user progress:", error)
        return null
      }

      // Format the data for easier consumption
      const courses: Record<string, any> = {}

      data.forEach((progress) => {
        if (!courses[progress.course_id]) {
          courses[progress.course_id] = {
            completedLessons: 0,
            totalLessons: 0,
            lessons: {},
          }
        }

        courses[progress.course_id].lessons[progress.lesson_id] = {
          completed: progress.completed,
          progress_data: progress.progress_data,
        }

        if (progress.completed) {
          courses[progress.course_id].completedLessons++
        }
      })

      // Get total lessons for each course
      const allCourses = await supabase.from("courses").select("id, lesson_count")

      if (!allCourses.error && allCourses.data) {
        allCourses.data.forEach((course) => {
          if (courses[course.id]) {
            courses[course.id].totalLessons = course.lesson_count
          }
        })
      }

      return { courses }
    }
  } catch (error) {
    console.error("Error in getUserProgress:", error)
    return null
  }
}
