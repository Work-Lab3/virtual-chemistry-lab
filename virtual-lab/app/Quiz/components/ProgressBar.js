'use client'

import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

