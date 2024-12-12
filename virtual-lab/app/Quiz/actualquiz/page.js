'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import QuizQuestion from '../components/QuizQuestion'
import ProgressBar from '../components/ProgressBar'
import Timer from '../components/Timer'
import { getQuestions } from '../(Appwrite)/appwrite'

const forDifficulty = {
  easy: ['67496f79000f57a9a7b7','6752b47200105ca74eaa','6752ada6000023c5a737','675a86de001e52aaa4da','675a939c001d0d47559d','675a97c1000590dcfd92'],
  medium: ['67497061000fe1f8ef17','6752adae00392ad7e7a8' ,'675a8f8b003598cb85ec','675a90710027044f60b3','675a96be002a85647840'],
  hard: ['67497066002b4e582f55','6752ae6600332d4d1c13','675a85fd00058fb21ec0','675a9bfa001f0d4bfdcc','675ab58a00202b35f4af']
}

export default function Quiz() {
  const [answerGiven, setAnswerGiven] = useState(false)
  const [difficulty, setDifficulty] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const difficultyParam = params.get('difficulty')
    if (difficultyParam && forDifficulty[difficultyParam]) {
      setDifficulty(difficultyParam)
    } else {
      setError('Invalid difficulty level')
    }
  }, [])

  const loadQuestions = useCallback(async () => {
    if (difficulty) {
      setLoading(true)
      setError(null)
      try {
        const randomId = forDifficulty[difficulty][Math.floor(Math.random() * forDifficulty[difficulty].length)]
        
        const fetchedQuestions = await getQuestions(randomId)
        setQuestions(fetchedQuestions?.documents || [])
      } catch (err) {
        setError('Failed to load questions. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }, [difficulty])

  useEffect(() => {
    loadQuestions()
  }, [loadQuestions])

  useEffect(() => {
    if (quizCompleted) return

    if (timeLeft === 0) {
      handleNextQuestion()
    }
    const timer = setTimeout(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, quizCompleted])

  const handleAnswer = (answer, correctAnswer) => {
    setAnswerGiven(true)
    const correct = answer.trim() === correctAnswer.trim()
    if (correct) {
      setScore((prevScore) => prevScore + 1)
    }
    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setTimeLeft(30)
        setAnswerGiven(false)
      } else {
        setQuizCompleted(true)
      }
    }, 1000)
  }

  useEffect(() => {
    if (quizCompleted) {
      window.location.href = `/Quiz/result?score=${score}&total=${questions.length}&difficulty=${difficulty}`
    }
  }, [quizCompleted, score, questions.length, difficulty])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-2xl font-bold text-gray-700"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Quiz...
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-600">
          {error}
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-red-600">
          No questions available for this difficulty level.
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${getDifficultyBackground(difficulty)}`}>
      <Head>
        <title>Chemistry Quiz - {difficulty} Mode</title>
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
          <Timer
            timeLeft={timeLeft}
            difficulty={difficulty}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <QuizQuestion
                question={questions[currentQuestionIndex]}
                handleAnswer={handleAnswer}
                difficulty={difficulty}
                answerGiven={answerGiven}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}

function getDifficultyBackground(difficulty) {
  switch (difficulty?.toLowerCase()) {
    case 'easy':
      return 'bg-gradient-to-br from-emerald-100 to-blue-200'
    case 'medium':
      return 'bg-gradient-to-br from-amber-100 to-orange-200'
    case 'hard':
      return 'bg-gradient-to-br from-rose-100 to-purple-200'
    default:
      return 'bg-gradient-to-br from-gray-100 to-gray-200'
  }
}

