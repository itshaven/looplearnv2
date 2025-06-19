"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, RotateCcw } from "lucide-react"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function CodeEditor({ value, onChange, language }: CodeEditorProps) {
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)

  // In a real implementation, we would use a proper code editor like Monaco Editor
  // This is a simplified version for demonstration purposes

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    try {
      // For JavaScript, we can use a sandboxed iframe or Web Workers
      // For other languages, we would need a backend service
      if (language === "javascript") {
        // Create a safe evaluation environment
        const originalConsoleLog = console.log
        const logs: string[] = []

        console.log = (...args) => {
          logs.push(args.map((arg) => String(arg)).join(" "))
          originalConsoleLog(...args)
        }

        // Execute the code in a try-catch block
        try {
          // eslint-disable-next-line no-new-func
          new Function(value)()
          setOutput(logs.join("\n"))
        } catch (error: any) {
          setOutput(`Error: ${error.message}`)
        }

        // Restore console.log
        console.log = originalConsoleLog
      } else {
        setOutput(`Running ${language} code is not supported in this demo.`)
      }
    } catch (error: any) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    // In a real app, we would reset to the starter code from the lesson
    onChange("")
    setOutput("")
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between bg-muted p-2">
        <div className="text-sm font-medium">{language}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetCode}>
            <RotateCcw className="mr-2 h-3 w-3" />
            Reset
          </Button>
          <Button size="sm" onClick={runCode} disabled={isRunning}>
            <Play className="mr-2 h-3 w-3" />
            Run
          </Button>
        </div>
      </div>
      <div className="min-h-[300px] rounded-md border bg-background p-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full min-h-[200px] font-mono text-sm bg-transparent resize-none focus:outline-none"
          placeholder={`Write your ${language} code here...`}
        />
      </div>
      {output && (
        <Card className="p-4 bg-black text-white font-mono text-sm overflow-auto max-h-[200px]">
          <pre>{output}</pre>
        </Card>
      )}
    </div>
  )
}
