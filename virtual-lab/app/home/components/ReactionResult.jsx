'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useColor } from "@/context/contextProvider"
import { useEffect } from "react"

export default function ReactionResult({ result }) {
  const {color, setColor}=useColor()
  useEffect(()=>{

    setColor(result.ProductColor)
  },[])
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Reaction Result</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-2">Product: <span className="font-semibold">{result.Product}</span></p>
        <div className="flex items-center">
          <span className="mr-2">Color:</span>
          <div
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            aria-label={`Color: ${result.color}`}
          />
           ({result.ProductColor2})
        </div>
      </CardContent>
    </Card>
  )
}

