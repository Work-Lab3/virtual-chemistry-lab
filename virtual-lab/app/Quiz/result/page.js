'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ResultsChart from '../components/results-chart'

export default function ResultsContent() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const total = searchParams.get('total')
  const difficulty = searchParams.get('difficulty')

  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (score && total) {
      const calculatedPercentage = Math.round((parseInt(score) / parseInt(total)) * 100)
      setPercentage(calculatedPercentage)
    }
  }, [score, total])

  if (!score || !total || !difficulty) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          Invalid results data
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Quiz Results</h1>
        <ResultsChart score={parseInt(score)} total={parseInt(total)} />
        <p className="text-2xl text-center mt-4">
          You scored <span className="font-bold text-blue-600">{score}</span> out of{' '}
          <span className="font-bold">{total}</span>
        </p>
        <p className="text-xl text-center mt-2">
          Difficulty: <span className="font-bold capitalize">{difficulty}</span>
        </p>
        <motion.div
          className="text-5xl font-bold text-center mt-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
          {percentage}%
        </motion.div>
        <div className="mt-8 flex justify-center space-x-4">
          <Link 
            href="/Quiz"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            Play Again
          </Link>
          <Link 
            href="/leaderboard"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            View Leaderboard
          </Link>
        </div>
      </motion.div>
    </main>
  )
}

