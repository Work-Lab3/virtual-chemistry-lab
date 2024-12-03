'use client'

import { motion } from 'framer-motion'

export default function ResultsChart({ score, total }) {
  const percentage = (score / total) * 100

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="10"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 2.83} 283`}
          initial={{ strokeDashoffset: 283 }}
          animate={{ strokeDashoffset: 283 - percentage * 2.83 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-4xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 1 }}
        >
          {Math.round(percentage)}%
        </motion.span>
      </div>
    </div>
  )
}

