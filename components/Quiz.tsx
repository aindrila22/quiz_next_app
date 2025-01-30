"use client"

import { useState } from "react"
import Question from "./Question"

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    timeLimit: 15,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars",
    timeLimit: 10,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    timeLimit: 20,
  },
]

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleTimeout = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  if (quizCompleted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl">
          Your score: {score} out of {questions.length}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <Question question={questions[currentQuestionIndex]} onAnswer={handleAnswer} onTimeout={handleTimeout} />
      <p className="mt-4 text-center">
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
    </div>
  )
}

