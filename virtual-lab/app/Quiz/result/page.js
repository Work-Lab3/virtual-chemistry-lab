'use client'
import { Suspense, useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '@/components/ui/button' 
import confetti from 'canvas-confetti'
import { Beaker, ZapIcon, Trophy, Star, Share2, Download, AtomIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

const ElementBubble = ({ symbol, name, color, delay, x, y }) => (
  <motion.div
    className="absolute rounded-full flex items-center justify-center cursor-pointer"
    style={{ 
      width: '80px', 
      height: '80px', 
      backgroundColor: color,
      boxShadow: `0 0 30px ${color}80`,
      left: `${x}%`,
      top: `${y}%`
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.2, boxShadow: `0 0 40px ${color}` }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-white text-center">
            <div className="text-2xl font-bold">{symbol}</div>
            <div className="text-xs">{name}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to learn more about {name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </motion.div>
)

const AnimatedPercentage = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayValue(prev => {
        if (prev < value) {
          return prev + 1
        }
        clearInterval(timer)
        return prev
      })
    }, 20)
    
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <div className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600 animate-pulse">
      {displayValue}%
    </div>
  )
}

const ScoreCard = ({ score, total }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-6 shadow-lg flex items-center justify-between"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center">
        <Trophy className="w-16 h-16 text-yellow-300 mr-4" />
        <div>
          <div className="text-lg text-white">Your Score</div>
          <div className="text-4xl font-bold text-white">{score} / {total}</div>
        </div>
      </div>
      <Star className="w-12 h-12 text-yellow-300" />
    </motion.div>
  )
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-200 dark:bg-blue-900 opacity-20"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`
          }}
        />
      ))}
    </div>
  )
}

export default function ResultPage() {
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

      if (calculatedPercentage > 80) {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
        }, 500)
      }
    }
  }, [score, total, progressAnimation])

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Chemistry Quiz Results',
        text: `I scored ${score}/${total} on the ${difficulty} difficulty Chemistry Quiz!`,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      alert('Share feature is not supported on this browser');
    }
  }

  const downloadCertificate = () => {
    alert('Certificate download feature coming soon!');
  }

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 p-4 overflow-hidden">
      <ParticleBackground />
      <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl relative backdrop-blur-sm bg-white/10 dark:bg-gray-800/30">
        <CardContent className="relative p-8 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.div 
              className="flex items-center justify-center space-x-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            >
              <AtomIcon className="w-16 h-16 text-blue-400" />
              <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                Quiz Results
              </h1>
            </motion.div>

            <div className="relative h-60">
              <ElementBubble symbol="Na" name="Sodium" color="#3B82F6" delay={0.5} x={10} y={20} />
              <ElementBubble symbol="Cl" name="Chlorine" color="#10B981" delay={0.7} x={70} y={60} />
              <ElementBubble symbol="H" name="Hydrogen" color="#EF4444" delay={0.9} x={30} y={80} />
              <ElementBubble symbol="O" name="Oxygen" color="#3B82F6" delay={1.1} x={80} y={10} />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.3, duration: 0.8, type: 'spring' }}
              >
                <Beaker className="w-32 h-32 text-teal-400" />
              </motion.div>
            </div>

            <ScoreCard score={score} total={total} />

            <div className="space-y-4">
              <Progress value={percentage} className="h-8 bg-gray-700" />
              <div className="flex justify-center">
                <AnimatedPercentage value={percentage} />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-2xl text-blue-200">
                Difficulty: <span className="font-bold capitalize">{difficulty}</span>
              </p>
              <motion.p
                className="text-xl text-teal-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                {percentage >= 80 ? "Excellent work, future scientist!" : 
               percentage >= 60 ? "Great effort! Keep studying!" : 
               "Don't give up! Every attempt makes you stronger!"}
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/Quiz">
                <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
                  <ZapIcon className="w-5 h-5 mr-2" />
                  Take Another Quiz
                </Button>
              </Link>
              <Link href="/home">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-blue-500 text-blue-100 bg-blue-500/20 hover:bg-blue-600/40 dark:hover:bg-blue-800/40 font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
                  <Beaker className="w-5 h-5 mr-2" />
                Visit Our
                </Button>
              </Link>
              <Button onClick={shareResults} variant="outline" className="w-full sm:w-auto border-2 border-teal-500 text-teal-100 bg-teal-500/20 hover:bg-teal-600/40 dark:hover:bg-teal-800/40 font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
                <Share2 className="w-5 h-5 mr-2" />
                Share Results
              </Button>
              <Button onClick={downloadCertificate} variant="outline" className="w-full sm:w-auto border-2 border-yellow-500 text-yellow-100 bg-yellow-500/20 hover:bg-yellow-600/40 dark:hover:bg-yellow-800/40 font-bold py-3 px-6 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg">
                <Download className="w-5 h-5 mr-2" />
                Get Certificate
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </main>
  )
}
