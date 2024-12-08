import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trophy, Star } from 'lucide-react'

export const ElementBubble = ({ symbol, name, color, delay, x, y }) => (
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

export const AnimatedPercentage = ({ value }) => {
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

export const ScoreCard = ({ score, total }) => {
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

export const ParticleBackground = () => {
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

