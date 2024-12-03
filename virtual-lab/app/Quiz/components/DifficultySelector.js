'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const difficulties = [
  { name: 'Easy', color: 'from-green-400 to-green-600', hoverColor: 'from-green-500 to-green-700' },
  { name: 'Medium', color: 'from-yellow-400 to-yellow-600', hoverColor: 'from-yellow-500 to-yellow-700' },
  { name: 'Hard', color: 'from-red-400 to-red-600', hoverColor: 'from-red-500 to-red-700' },
]

export default function DifficultySelector() {
  const [hoveredDifficulty, setHoveredDifficulty] = useState(null)

  return (
    <div className="flex space-x-4">
      {difficulties.map((difficulty) => (
        <Link href={`Quiz/actualquiz?difficulty=${difficulty.name.toLowerCase()}`} key={difficulty.name}>
          <motion.div
            className={`
              relative overflow-hidden px-8 py-4 rounded-lg text-white font-bold text-lg
              transition-all duration-300 ease-in-out cursor-pointer
              ${hoveredDifficulty === difficulty.name ? `bg-gradient-to-br ${difficulty.hoverColor}` : `bg-gradient-to-br ${difficulty.color}`}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoveredDifficulty(difficulty.name)}
            onHoverEnd={() => setHoveredDifficulty(null)}
          >
            {difficulty.name}
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: hoveredDifficulty === difficulty.name ? [0, 1, 1] : 0,
                opacity: hoveredDifficulty === difficulty.name ? [0, 1, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
