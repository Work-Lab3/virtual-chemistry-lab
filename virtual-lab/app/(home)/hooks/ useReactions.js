import { DataBring } from '@/lib/appwrite'
import { useState, useEffect } from 'react'

export function useReactions() {
  const [reactions, setReactions] = useState([])

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const reactionsList = [
          { reactant1: "Vinegar", reactant2: "Baking Soda", product: "Carbon Dioxide", color: "#FFFFFF" },
          { reactant1: "Water", reactant2: "Salt", product: "Salt Water", color: "#E0F2FE" },
          { reactant1: "Lemon Juice", reactant2: "Baking Soda", product: "Carbon Dioxide", color: "#FEF9C3" },
          { reactant1: "Milk", reactant2: "Vinegar", product: "Curdled Milk", color: "#F1F5F9" },
        ]
        setReactions(reactionsList)
      } catch (error) {
        console.error('Error fetching reactions:', error)
      }
    }

    fetchReactions()
   
    
  }, [])

const productData=async (id,name)=>{
  let response = await DataBring(id,name)
  return response
}

  const getReaction = async (chemical1, chemical2) => {
    const response=await productData(chemical1.id,chemical2.name)
    console.log(response)
    const reaction = reactions.find(
      r => (r.reactant1 === chemical1 && r.reactant2 === chemical2) ||
           (r.reactant1 === chemical2 && r.reactant2 === chemical1)
    )
    return reaction || { product: "No Reaction", color: "#D1D5DB" }
  }

  return { getReaction }
}

