'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ParticleEffect = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 100,
            y: particle.y + (Math.random() - 0.5) * 100,
            opacity: [1, 0],
          }}
          transition={{ duration: 1 }}
        />
      ))}
    </div>
  )
}

export default ParticleEffect

