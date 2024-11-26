import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReactionResult({ result }) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Reaction Result</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-2">Product: <span className="font-semibold">{result.product}</span></p>
        <div className="flex items-center">
          <span className="mr-2">Color:</span>
          <div
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: result.color }}
            aria-label={`Color: ${result.color}`}
          />
        </div>
      </CardContent>
    </Card>
  )
}

