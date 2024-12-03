'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import QuizQuestion from './QuizQuestion'
import ProgressBar from './ProgressBar'
import Timer from './Timer'

export default function QuizContent({ questions, difficulty }) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [quizCompleted, setQuizCompleted] = useState(false)

  console.log("Let's do it")

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion()
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleAnswer = () => {

    console.log("handleAnswer called with:", answer, correctAnswer)
    const correct = answer === correctAnswer
    if (correct) {
      setScore((prevScore) => prevScore + 1)
    }
    setAnswerGiven(true)
    handleNextQuestion()

  }
  const ab = () => {
    console.log('done');

  }

  const handleNextQuestion = () => {
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setTimeLeft(60)
        setAnswerGiven(false)
      } else {
        setQuizCompleted(true)
      }
    }, 4000)
  }

  useEffect(() => {
    if (quizCompleted) {
      router.push(`/results?score=${score}&total=${questions.length}&difficulty=${difficulty}`)
    }
  }, [quizCompleted, router, score, questions.length, difficulty])

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <Timer timeLeft={timeLeft} difficulty={difficulty} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <QuizQuestion
            answerGiven={answerGiven}
            question={questions[currentQuestionIndex]}
            handleAnswer={'hello'}
            difficulty={difficulty}
            namaste={'bye'}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

