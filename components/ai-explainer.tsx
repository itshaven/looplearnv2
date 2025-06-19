"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Send } from "lucide-react"

interface AiExplainerProps {
  lessonContent: string
  code: string
  language: string
}

export function AiExplainer({ lessonContent, code, language }: AiExplainerProps) {
  const [question, setQuestion] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([])

  const askQuestion = async () => {
    if (!question.trim()) return

    setIsLoading(true)

    try {
      const context = `
        The user is learning ${language} programming.
        Current lesson content: ${lessonContent}
        User's current code: ${code}
      `

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
          context,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to get response from AI")
      }

      const data = await res.json()
      setResponse(data.response)
      setHistory([...history, { question, answer: data.response }])
      setQuestion("")
    } catch (error) {
      console.error("Error asking question:", error)
      setResponse("Sorry, I couldn't process your question. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ask the AI Tutor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
          {history.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>Ask a question about the lesson or your code.</p>
              <p className="text-sm mt-2">Examples:</p>
              <ul className="text-sm mt-1 space-y-1">
                <li>"Can you explain how this code works?"</li>
                <li>"What's wrong with my implementation?"</li>
                <li>"How can I improve this solution?"</li>
              </ul>
            </div>
          ) : (
            history.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">You:</p>
                  <p>{item.question}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="font-medium">AI Tutor:</p>
                  <div className="prose dark:prose-invert">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask a question about the lesson or your code..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                askQuestion()
              }
            }}
            disabled={isLoading}
          />
          <Button size="icon" onClick={askQuestion} disabled={isLoading || !question.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
