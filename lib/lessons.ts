import { createClient } from "@/lib/supabase/server"

export async function getLesson(courseId: string, lessonId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .eq("id", lessonId)
    .single()

  if (error) {
    console.error("Error fetching lesson:", error)

    // Return sample lesson if not found in database
    if (courseId === "javascript-basics" && lessonId === "lesson-1") {
      return {
        id: "lesson-1",
        title: "Introduction to JavaScript",
        content: `
          <h2>Welcome to JavaScript!</h2>
          <p>JavaScript is a programming language that powers the dynamic behavior on websites. It is an essential skill for web developers.</p>
          <h3>What You'll Learn</h3>
          <ul>
            <li>How to write your first JavaScript code</li>
            <li>How to use the console for debugging</li>
            <li>Basic syntax and structure</li>
          </ul>
          <h3>Your First JavaScript Code</h3>
          <p>Let's start by writing a simple "Hello, World!" program:</p>
          <pre><code>console.log("Hello, World!");</code></pre>
          <p>Try running this code in the editor!</p>
        `,
        starterCode: 'console.log("Hello, World!");',
        language: "javascript",
        nextLessonId: "lesson-2",
      }
    }

    return null
  }

  return data
}
