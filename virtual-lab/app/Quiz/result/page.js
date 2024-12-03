'use client'

import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ResultsChart from '../components/results-chart'

// Create a wrapper around useSearchParams to make it suspendable
function SearchParamsWrapper({ children }) {
  const searchParams = useSearchParams()
  
  // Suspense will handle the async behavior
  if (!searchParams) {
    throw new Promise(() => {})  // Suspend rendering until searchParams is ready
  }

  return children(searchParams)
}

export default function ResultsContent() {
  const [percentage, setPercentage] = useState(0)

  // Wrap the useSearchParams() in Suspense boundary
  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Quiz Results</h1>

        <Suspense fallback={<div className="text-center">Loading results...</div>}>
          <SearchParamsWrapper>
            {(searchParams) => {
              const score = searchParams.get('score')
              const total = searchParams.get('total')
              const difficulty = searchParams.get('difficulty')

              useEffect(() => {
                if (score && total) {
                  const calculatedPercentage = Math.round((parseInt(score) / parseInt(total)) * 100)
                  setPercentage(calculatedPercentage)
                }
              }, [score, total])

              if (!score || !total || !difficulty) {
                return <div>Invalid results data</div>
              }

              return (
                <>
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
                    <Link href="/Quiz" passHref legacyBehavior>
                      <motion.a
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Play Again
                      </motion.a>
                    </Link>
                    <Link href="/leaderboard" passHref legacyBehavior>
                      <motion.a
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Leaderboard
                      </motion.a>
                    </Link>
                  </div>
                </>
              )
            }}
          </SearchParamsWrapper>
        </Suspense>
      </motion.div>
    </main>
  )
}
