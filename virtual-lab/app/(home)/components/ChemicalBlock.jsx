'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listDocuments } from '@/lib/appwrite'

export default function ChemicalBlock({ 
  chemicals, 
  onSelect, 
  block1, 
  disabled, 
  title, 
  setChemicalBlock 
}) {

  const listChemicals = async (collectionId) => {
    if (!setChemicalBlock) return;
    
    try {
      let response = await listDocuments(collectionId);
      console.log(response);

      const newChemicalBlocks = response.documents.map((item) => ({
        name: item.Chemical,
        image: item.Image
      }));

      setChemicalBlock(prev => [...prev, ...newChemicalBlocks]);
    } catch (error) {
      console.error("Error fetching chemicals:", error);
    }
  }

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
              onClick={() => {
                onSelect(chemical.name);
                if (block1 && chemical.collectionId) listChemicals(chemical.collectionId);
              }}
              disabled={disabled}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-100'
              }`}
            >
              <img
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

