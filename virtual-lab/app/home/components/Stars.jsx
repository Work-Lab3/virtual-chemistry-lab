'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Stars() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 3}s`
    }))
    setStars(newStars)

    const interval = setInterval(() => {
      setStars(prevStars => prevStars.map(star => ({
        ...star,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star absolute w-1 h-1 bg-white rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: parseFloat(star.animationDuration),
            repeat: Infinity,
          }}
          style={{
            top: star.top,
            left: star.left,
          }}
        />
      ))}
    </>
  )
}

