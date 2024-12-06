'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      className="w-full py-4 px-6 flex justify-between items-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Link href="/Quiz" className="text-2xl font-bold text-blue-800 flex items-center">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <path d="M9.75 3a1.5 1.5 0 0 0-1.5 1.5v1.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-1.5a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5V4.5a1.5 1.5 0 0 0-1.5-1.5h-3Z" />
        </motion.svg>
        Chemistry Quiz
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-blue-800 hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="#" className="text-blue-800 hover:text-blue-600 transition-colors">
              Leaderboard
            </Link>
          </li>
          <li>
            <Link href="#" className="text-blue-800 hover:text-blue-600 transition-colors">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  )
}

