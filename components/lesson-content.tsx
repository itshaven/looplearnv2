"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeEditor } from "@/components/code-editor"
import { AiExplainer } from "@/components/ai-explainer"
import { saveProgress } from "@/lib/save-progress"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface LessonContentProps {
  lesson: any
  userProgress: any
  userId: string
  courseId: string
  lessonId: string
}

export function LessonContent({ lesson, userProgress, userId, courseId, lessonId }: LessonContentProps) {
  const [code, setCode] = useState(userProgress?.code || lesson.starterCode || "")
  const [isCompleted, setIsCompleted] = useState(userProgress?.completed || false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Auto-save progress every 30 seconds
    const interval = setInterval(() => {
      handleSaveProgress(false)
    }, 30000)

    return () => clearInterval(interval)
  }, [code])

  const handleSaveProgress = async (showToast = true) => {
    try {
      setIsSaving(true)
      await saveProgress({
        userId,
        courseId,
        lessonId,
        progress: {
          code,
        },
        completed: isCompleted,
      })

      if (showToast) {
        toast({
          title: "Progress saved",
          description: "Your progress has been saved successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleComplete = async () => {
    setIsCompleted(true)
    await handleSaveProgress()
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="code">Code Editor</TabsTrigger>
          <TabsTrigger value="ai">AI Explainer</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-2">
          <Card>
            <CardContent className="p-0">
              <CodeEditor value={code} onChange={setCode} language={lesson.language || "javascript"} />
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleSaveProgress} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Progress"}
              </Button>
              {!isCompleted && (
                <Button onClick={handleComplete}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ai" className="mt-2">
          <AiExplainer lessonContent={lesson.content} code={code} language={lesson.language || "javascript"} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/courses/${courseId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
        {lesson.nextLessonId && isCompleted && (
          <Button asChild>
            <Link href={`/courses/${courseId}/${lesson.nextLessonId}`}>
              Next Lesson
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
