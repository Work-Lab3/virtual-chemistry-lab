import { DataBring, listDocuments } from '@/lib/appwrite'
import { useState, useEffect } from 'react'

export function useChemicals() {
  const [chemicals, setChemicals] = useState([])

  useEffect(() => {
    const fetchChemicals = async () => {
      // try {
      //   const chemicalsList = [
      //     { name: "Water", image: "https://wallpaperaccess.com/full/630370.jpg" },
      //     { name: "Vinegar", image: "/placeholder.svg?height=80&width=80&text=CH3COOH" },
      //     { name: "Baking Soda", image: "/placeholder.svg?height=80&width=80&text=NaHCO3" },
      //     { name: "Salt", image: "/placeholder.svg?height=80&width=80&text=NaCl" },
      //     { name: "Sugar", image: "/placeholder.svg?height=80&width=80&text=C12H22O11" },
      //     { name: "Lemon Juice", image: "/placeholder.svg?height=80&width=80&text=Citric+Acid" },
      //     { name: "Milk", image: "/placeholder.svg?height=80&width=80&text=Milk" },
      //     { name: "Soap", image: "/placeholder.svg?height=80&width=80&text=Soap" }
      //   ]
      //   setChemicals(chemicalsList)
      // } catch (error) {
      //   console.error('Error fetching chemicals:', error)
      // }

      listDocuments('6745c4e700317a9005db').then(res => {
        console.log(res)
        res.documents.map(item => {
          setChemicals(prev => [...prev, { name: item.ChemicalName, image: item.Image,collectionId:item.CollectionId
          }])
        })
      })
    }

    fetchChemicals()
  }, [])

  return { chemicals }
}

