'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useColor } from "@/context/contextProvider"
import { useEffect } from "react"
import { motion } from 'framer-motion'

export default function ReactionResult({ result }) {
  const {color, setColor} = useColor()
  console.log(result)
  useEffect(() => {
    setColor(result.ProductColor)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-green-300">Reaction Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Product: <span className="font-semibold text-yellow-300">{result.Product}</span></p>
          <div className="flex items-center justify-center">
            <span className="mr-4 text-lg">Color:</span>
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <span className="ml-4 text-lg">({result.ProductColor2})</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

