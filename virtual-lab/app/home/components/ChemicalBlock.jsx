'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { listDocuments } from '@/lib/appwrite'

export default function ChemicalBlock({
  chemicals,
  onSelect,
  block1,
  disabled,
  title,
  setChemicalBlock,
  setFrstDisable,
  frstDisable
}) {

  const listChemicals = async (collectionId) => {
    if (!setChemicalBlock) return;

    try {
      let response = await listDocuments(collectionId);

      const newChemicalBlocks = response.documents.map((item) => ({
        name: item.Chemical,
        image: item.Image,
        color: item?.ChemicalColor
      }));

      setChemicalBlock(prev => [...prev, ...newChemicalBlocks]);
    } catch (error) {
      console.error("Error fetching chemicals:", error);
    }
  }

  return (
    <Card className={`w-full md:w-64 bg-white/10 backdrop-blur-sm border-white/20 text-white ${((disabled && block1)||frstDisable) ? 'hidden': 'nothing'}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-300">{`${!disabled ? title: ''}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {chemicals.map((chemical, index) => (
            <motion.button
              key={chemical.name}
              onClick={() => {
                console.log(chemical)
                onSelect({ name: chemical.name,
                   id: chemical?.collectionId, 
                  color: chemical.color
                });
                if (block1 && chemical.collectionId) listChemicals(chemical.collectionId);
               setFrstDisable(false);
              }}
              disabled={disabled}
              className="flex flex-col items-center p-2 rounded-lg transition-opacity duration-500"
              
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: (disabled && block1)? 0 : 1, y: 0 }} // Control opacity via framer-motion
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-lg transition-transform transform hover:rotate-12">
                <img
                  src={chemical.image}
                  alt={chemical.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-center">{chemical.name}</span>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
