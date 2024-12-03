'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import Header from '../components/Header'
import QuizQuestion from '../components/QuizQuestion'
import ProgressBar from '../components/ProgressBar'
import Timer from '../components/Timer'
import { getQuestions } from '../(Appwrite)/appwrite'

export default function Quiz() {
  const [answerGiven, setAnswerGiven] = useState(false)


  const [difficulty, setDifficulty] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  const forDifficulty = {
    easy: '67496f79000f57a9a7b7',
    medium: '67497061000fe1f8ef17',
    hard: '67497066002b4e582f55'
  }

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const difficultyParam = params.get('difficulty')
    setDifficulty(difficultyParam)
  }, [])

  useEffect(() => {
    async function loadQuestions() {
      if (difficulty) {
        setLoading(true)
        const fetchedQuestions = await getQuestions(forDifficulty[difficulty])
        console.log(fetchedQuestions)
        setQuestions(fetchedQuestions?.documents)
        setLoading(false)
      }
    }
    loadQuestions()
  }, [difficulty])

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion()
    }
    const timer = setTimeout(() => setTimeLeft(prev => (prev > 0 ? prev - 1 : 0)), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleAnswer = (answer,correctAnswer) => {

    setAnswerGiven(true);
    console.log("handleAnswer called with:", answer, correctAnswer)
    const correct = answer === correctAnswer
    if (correct) {
      setScore((prevScore) => prevScore + 1)
    }
    handleNextQuestion()

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
