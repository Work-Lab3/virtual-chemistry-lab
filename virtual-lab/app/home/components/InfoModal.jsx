'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const InfoModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white text-black p-8 rounded-lg max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Welcome to the Virtual Chemistry Lab!</h2>
            <p className="mb-4">
              Explore the fascinating world of chemical reactions in this interactive virtual lab.
              Select chemicals, mix them, and observe the results of your experiments.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Choose chemicals from the Primary and Secondary blocks</li>
              <li>Combine two chemicals in the Reaction Chamber</li>
              <li>Click "React" to see the result of your experiment</li>
              <li>Use "Reset" to start a new experiment</li>
            </ul>
            <p>
              Have fun and stay curious! Remember, in a real lab, always follow proper safety
              procedures and guidelines.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InfoModal

