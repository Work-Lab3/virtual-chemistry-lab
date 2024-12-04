'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"



export default function ResultPage() {
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
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Invalid results data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <p className="text-2xl mb-2">
                You scored <span className="font-bold text-primary">{score}</span> out of{' '}
                <span className="font-bold">{total}</span>
              </p>
              <p className="text-xl">
                Difficulty: <span className="font-bold capitalize">{difficulty}</span>
              </p>
            </div>

            <div className="space-y-2">
              <Progress value={percentage} className="w-full h-4" />
              <p className="text-center text-4xl font-bold">{percentage}%</p>
            </div>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            >
              <Link href="/Quiz">
                <Button variant="default">
                  Play Again
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button variant="outline">
                  View Leaderboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </main>
  )
}

