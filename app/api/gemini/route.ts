import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { googleGenerativeAI } from "@ai-sdk/google"
import { getCurrentUser } from "@/lib/auth"

const gemini = googleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { prompt, context } = await req.json()

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 })
    }

    const fullPrompt = context ? `${context}\n\nUser question: ${prompt}` : prompt

    const { text } = await generateText({
      model: gemini("gemini-pro"),
      prompt: fullPrompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("[GEMINI_ERROR]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
