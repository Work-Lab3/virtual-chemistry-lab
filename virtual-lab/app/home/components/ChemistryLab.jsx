'use client'

import { useState, useEffect } from 'react'
import TestTube from '../components/TestTube'
import ChemicalBlock from '../components/ChemicalBlock'
import ReactionResult from '../components/ReactionResult'
import { Button } from "@/components/ui/button"
import { useChemicals } from '../hooks/useChemicals'
import { useReactions } from '../hooks/ useReactions'
import { motion, AnimatePresence } from 'framer-motion'
import { Beaker, Atom, Zap, Info } from 'lucide-react'
import Stars from '../components/Stars'
import ParticleEffect from '../components/ParticleEffect'
import InfoModal from '../components/InfoModal'

export default function ChemistryLab() {
  const [selectedChemicals, setSelectedChemicals] = useState([])
  const [reactionResult, setReactionResult] = useState(null)
  const { chemicals } = useChemicals()
  const { getReaction } = useReactions()
  const [chemicalsBlock2, setChemicalsBlock2] = useState([])
  const [isExploding, setIsExploding] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const handleChemicalSelect = (chemicalName, blockIndex) => {
    console.log(chemicalName)
    if (
      (blockIndex === 0 && selectedChemicals.length === 0) ||
      (blockIndex === 1 && selectedChemicals.length === 1)
    ) {
      setSelectedChemicals([...selectedChemicals, chemicalName])
      setShowParticles(true)
      setTimeout(() => setShowParticles(false), 1000)
    }
  }

  const handleReact = async () => {
    if (selectedChemicals.length === 2) {
      setIsExploding(true)
      setTimeout(() => setIsExploding(false), 1000)
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
  return (
    <div className="min-h-screen w-full bg-[url('/space-background.jpg')] bg-cover bg-center bg-fixed flex items-center justify-center p-4 relative overflow-hidden">
      <Stars />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto bg-black/60 backdrop-blur-md rounded-lg shadow-2xl p-8 text-white border border-white/10 relative"
      >
        <h1 className="text-5xl font-bold text-center mb-8 text-blue-300 flex items-center justify-center">
          <Beaker className="mr-4 h-12 w-12" />
          Virtual Chemistry Lab
          <Atom className="ml-4 h-12 w-12 animate-spin-slow" />
        </h1>
        <Button
          onClick={() => setShowInfoModal(true)}
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
        >
          <Info className="h-6 w-6" />
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-stretch mb-8 space-y-8 md:space-y-0 md:space-x-8">
          <ChemicalBlock
            chemicals={chemicalsBlock1}
            onSelect={(name) => handleChemicalSelect(name, 0)}
            setChemicalBlock={setChemicalsBlock2}
            block1={true}
            disabled={selectedChemicals.length !== 0}
            title="Primary Chemicals"
          />
          <div className="flex flex-col items-center justify-center relative">
            <TestTube chemicals={selectedChemicals} reactionResult={reactionResult} />
            <div className="w-full md:w-64 mt-4">
              <h2 className="text-2xl font-bold mb-2 text-center text-yellow-300">Reaction Chamber</h2>
              <AnimatePresence>
                {selectedChemicals.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-wrap justify-center mb-4"
                  >
                    {selectedChemicals.map((item, index) => (
                      <motion.span
                        key={index}
                        className="inline-block px-3 py-1 bg-blue-500 rounded-full text-sm mr-2 mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {item.name}
                        {index < selectedChemicals.length - 1 && (
                          <Zap className="inline-block ml-2 h-4 w-4 text-yellow-300" />
                        )}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  onClick={handleReact}
                  disabled={selectedChemicals.length !== 2}
                  className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  React
                </Button>
                <Button
                  onClick={resetExperiment}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-300 transform hover:scale-105"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <ChemicalBlock
            chemicals={chemicalsBlock2}
            onSelect={(name) => {
              handleChemicalSelect(name, 1)
            }}
            block1={false}
            disabled={selectedChemicals.length !== 1}
            title="Secondary Chemicals"
          />
        </div>
        {reactionResult && <ReactionResult result={reactionResult} />}
        {isExploding && (
          <motion.div
            className="absolute inset-0 bg-yellow-500 opacity-50"
            initial={{ scale: 0 }}
            animate={{ scale: 10 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
      {showParticles && <ParticleEffect />}
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </div>
  )
}

