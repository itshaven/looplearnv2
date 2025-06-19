"use client"

interface SaveProgressParams {
  userId: string
  courseId: string
  lessonId: string
  progress: any
  completed: boolean
}

export async function saveProgress({ userId, courseId, lessonId, progress, completed }: SaveProgressParams) {
  try {
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId,
        lessonId,
        progress,
        completed,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to save progress")
    }

    return await response.json()
  } catch (error) {
    console.error("Error saving progress:", error)
    throw error
  }
}
