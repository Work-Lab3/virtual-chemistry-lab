import { useColor } from '@/context/contextProvider'
import { motion } from 'framer-motion'

export default function TestTube({ chemicals, reactionResult }) {
  
  const chemical1=chemicals[0]
  const chemical2=chemicals[1]
  
  const {color}=useColor();
  

  const getColor = (chemical) => {
    const colors = {
      "Water": "#3B82F6",
      "Vinegar": "#FDE68A",
      "Baking Soda": "#F3F4F6",
      "Salt": "#F3F4F6",
      "Sugar": "#F3F4F6",
      "Lemon Juice": "#FCD34D",
      "Alcohol(CH₃CH₂OH)": "#FFF",
      "Silver Nitrate": "#FFF"
    }
    return colors[chemical] || "#D1D5DB"
  }

  const getMixedColor = (chemical1, chemical2) => {
    const color1 = getColor(chemical1)
    const color2 = getColor(chemical2)
    return `linear-gradient(to top, ${color1} 50%, ${color2} 50%)`
  }

  return (
    <div className="absolute w-24 h-64 bg-gray-200 rounded-b-full outline-none border-none overflow-hidden shadow-inner">
      <div className="absolute inset-x-0 top-0 h-4 bg-gray-300 rounded-t-full"></div>
      {chemicals.length === 1 && (
        <motion.div
          className="absolute bottom-0 w-full"
          initial={{ height: 0 }}
          animate={{ height: '50%' }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: chemicals[0].color }}
        />
      )}
      {chemicals.length === 2 && (
        <motion.div
          className="absolute bottom-0 w-full"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 0.5 }}
          style={{ background: getMixedColor(chemicals[0], chemicals[1]) }}
        />
      )}
      {reactionResult && (
        <motion.div
          className="absolute bottom-0 w-full"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1 }}
          style={{ backgroundColor: color }}
        />
      )}
      Test Tube
    </div>
  )
}

