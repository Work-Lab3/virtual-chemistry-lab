import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChemicalBlock({ chemicals, onSelect, disabled, title }) {
  return (
    <Card className="w-full md:w-64">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {chemicals.map((chemical) => (
            <button
              key={chemical.name}
              onClick={() => onSelect(chemical.name)}
              disabled={disabled}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
            >
              <Image
                src={chemical.image}
                alt={chemical.name}
                width={80}
                height={80}
                className="object-contain rounded-full bg-gray-200 shadow-lg transition-transform transform hover:scale-105 hover:rotate-2 hover:shadow-2xl"
              />

              <span className="mt-2 text-sm font-medium text-center">{chemical.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

