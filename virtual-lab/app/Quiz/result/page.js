'use client'
import { Suspense, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import QuizResults from './QuizResults'

function ResultPageContent() {
  const searchParams = useSearchParams()
  const score = searchParams.get('score')
  const total = searchParams.get('total')
  const difficulty = searchParams.get('difficulty')

  const [percentage, setPercentage] = useState(0)
  const progressAnimation = useAnimation()

  useEffect(() => {
    if (score && total) {
      const calculatedPercentage = Math.round((parseInt(score) / parseInt(total)) * 100)
      setPercentage(calculatedPercentage)
      progressAnimation.start({
        width: `${calculatedPercentage}%`,
        transition: { duration: 2, ease: "easeInOut" }
      })
    }
  }, [score, total, progressAnimation])

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
    <QuizResults
      score={score}
      total={total}
      difficulty={difficulty}
      percentage={percentage}
      progressAnimation={progressAnimation}
    />
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading results...</p>
        </CardContent>
      </Card>
    }>
      <ResultPageContent />
    </Suspense>
  )
}

