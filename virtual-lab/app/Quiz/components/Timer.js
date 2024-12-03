'use client'

import { motion } from 'framer-motion'

export default function Timer({ timeLeft, difficulty }) {
  const getColor = () => {
    if (timeLeft > 30) return 'text-green-500'
    if (timeLeft > 10) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="flex items-center justify-center my-4">
      <motion.div
        className={`text-4xl font-bold ${getColor()}`}
        key={timeLeft}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {timeLeft}
      </motion.div>
      <motion.svg
        className="w-8 h-8 ml-2"
        viewBox="0 0 24 24"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className={getColor()}
        />
      </motion.svg>
    </div>
  )
}

