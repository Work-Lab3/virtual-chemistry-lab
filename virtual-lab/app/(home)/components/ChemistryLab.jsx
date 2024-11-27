'use client'

import { useState } from 'react'
import TestTube from './TestTube'
import ChemicalBlock from './ChemicalBlock'
import ReactionResult from './ReactionResult'
import { Button } from "@/components/ui/button"
import { useChemicals } from '../hooks/useChemicals'
import { useReactions } from '../hooks/ useReactions' 

export default function ChemistryLab() {
  const [selectedChemicals, setSelectedChemicals] = useState([])
  const [reactionResult, setReactionResult] = useState(null)
  const { chemicals } = useChemicals()
  const { getReaction } = useReactions()
  const [chemicalsBlock2, setChemicalsBlock2] = useState([])

  const handleChemicalSelect = (chemicalName, blockIndex) => {
    if (
      (blockIndex === 0 && selectedChemicals.length === 0) ||
      (blockIndex === 1 && selectedChemicals.length === 1)
    ) {
      setSelectedChemicals([...selectedChemicals, chemicalName])
    }
  }

  const handleReact = async () => {
    if (selectedChemicals.length === 2) {
      console.log(selectedChemicals)
      const result = await getReaction(selectedChemicals[0], selectedChemicals[1])
      setReactionResult(result)
    }
  }

  const resetExperiment = () => {
    setSelectedChemicals([])
    setReactionResult(null)
    setChemicalsBlock2([])
  }

  const chemicalsBlock1 = chemicals
  // console.log(chemicals)
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <ChemicalBlock 
          chemicals={chemicalsBlock1} 
          onSelect={(name) => handleChemicalSelect(name, 0)}
          setChemicalBlock={setChemicalsBlock2}
          block1={true}
          disabled={selectedChemicals.length !== 0}
          title="Block 1 Chemicals"
        />
        <div className="my-8 md:my-0">
          <TestTube chemicals={selectedChemicals} reactionResult={reactionResult} />
        </div>
        <ChemicalBlock 
          chemicals={chemicalsBlock2} 
          onSelect={(name) => {
            handleChemicalSelect(name, 1)
            console.log(name)
          }}          
          block1={false}
          disabled={selectedChemicals.length !== 1}
          title="Block 2 Chemicals"
        />
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          onClick={handleReact}
          disabled={selectedChemicals.length !== 2}
          className="bg-blue-500 hover:bg-blue-700"
        >
          React
        </Button>
        <Button
          onClick={resetExperiment}
          variant="outline"
          className="border-blue-500 text-blue-500 hover:bg-blue-100"
        >
          Reset
        </Button>
      </div>
      {reactionResult && <ReactionResult result={reactionResult} />}
    </div>
  )
}

