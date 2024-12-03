'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ResultsChart from './ResultsChart'

export default function ResultsContent({ score, total, difficulty, leaderboard }) {
  const percentage = Math.round((score / total) * 100)

  return (
    <>
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Quiz Results</h1>
        <ResultsChart score={score} total={total} />
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
          <Link href="/">
            <motion.a
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.a>
          </Link>
          <Link href="/leaderboard">
            <motion.a
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Leaderboard
            </motion.a>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index} className="flex justify-between items-center py-2 border-b">
              <span>{entry.username}</span>
              <span>{entry.score}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  )
}

