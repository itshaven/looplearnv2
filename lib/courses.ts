import { createClient } from "@/lib/supabase/server"

export async function getAllCourses() {
  const supabase = createClient()

  const { data, error } = await supabase.from("courses").select("*").order("order", { ascending: true })

  if (error) {
    console.error("Error fetching courses:", error)
    return []
  }

  // If no courses in the database yet, return sample courses
  if (!data || data.length === 0) {
    return [
      {
        id: "javascript-basics",
        title: "JavaScript Basics",
        description: "Learn the fundamentals of JavaScript programming",
        icon: "code",
        level: "Beginner",
        lessonCount: 10,
        modules: [
          {
            id: "module-1",
            title: "Getting Started",
            description: "Introduction to JavaScript",
            lessons: [
              {
                id: "lesson-1",
                title: "Introduction to JavaScript",
                nextLessonId: "lesson-2",
              },
              {
                id: "lesson-2",
                title: "Variables and Data Types",
                nextLessonId: "lesson-3",
              },
              {
                id: "lesson-3",
                title: "Operators and Expressions",
                nextLessonId: null,
              },
            ],
          },
        ],
      },
      {
        id: "html-css",
        title: "HTML & CSS Fundamentals",
        description: "Master the building blocks of the web",
        icon: "fileCode",
        level: "Beginner",
        lessonCount: 8,
        modules: [
          {
            id: "module-1",
            title: "HTML Basics",
            description: "Learn the structure of web pages",
            lessons: [
              {
                id: "lesson-1",
                title: "HTML Document Structure",
                nextLessonId: "lesson-2",
              },
              {
                id: "lesson-2",
                title: "HTML Elements and Attributes",
                nextLessonId: null,
              },
            ],
          },
        ],
      },
      {
        id: "react-essentials",
        title: "React Essentials",
        description: "Build modern user interfaces with React",
        icon: "code",
        level: "Intermediate",
        lessonCount: 12,
        modules: [
          {
            id: "module-1",
            title: "React Fundamentals",
            description: "Learn the basics of React",
            lessons: [
              {
                id: "lesson-1",
                title: "Introduction to React",
                nextLessonId: "lesson-2",
              },
              {
                id: "lesson-2",
                title: "Components and Props",
                nextLessonId: null,
              },
            ],
          },
        ],
      },
    ]
  }

  return data
}

export async function getCourse(courseId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("courses")
    .select("*, modules(*), modules.lessons(*)")
    .eq("id", courseId)
    .single()

  if (error) {
    console.error("Error fetching course:", error)

    // Return sample course if not found in database
    if (courseId === "javascript-basics") {
      return {
        id: "javascript-basics",
        title: "JavaScript Basics",
        description: "Learn the fundamentals of JavaScript programming",
        icon: "code",
        level: "Beginner",
        lessonCount: 10,
        modules: [
          {
            id: "module-1",
            title: "Getting Started",
            description: "Introduction to JavaScript",
            lessons: [
              {
                id: "lesson-1",
                title: "Introduction to JavaScript",
                nextLessonId: "lesson-2",
              },
              {
                id: "lesson-2",
                title: "Variables and Data Types",
                nextLessonId: "lesson-3",
              },
              {
                id: "lesson-3",
                title: "Operators and Expressions",
                nextLessonId: null,
              },
            ],
          },
        ],
      }
    }

    return null
  }

  return data
}
