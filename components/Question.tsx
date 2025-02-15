"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface QuestionProps {
  question: {
    question: string
    options: string[]
    correctAnswer: string
    timeLimit: number
  }
  onAnswer: (answer: string) => void
  onTimeout: () => void
}

export default function Question({ question, onAnswer, onTimeout }: QuestionProps) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTimeLeft(question.timeLimit) // Reset timer when a new question appears
  }, [question])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current) // Clear existing timer

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!)
          // Defer the call to onTimeout to avoid updating parent state during render
          setTimeout(() => {
            onTimeout()
          }, 0)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [question, onTimeout])

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full text-left justify-start"
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm font-medium">Time left: {timeLeft} seconds</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}