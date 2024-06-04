import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"


const Memory = () => {
  const [memoryData, setMemoryData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const handleMemoryList = async () => {

      try {
        const response = await fetch(`http://localhost:8000/api/workouts/${id}`)
        const data = await response.json()
        console.log(data)
        setMemoryData(data)

      } catch (error) {
        console.error(error)
      }
    }
    handleMemoryList()
  }, [id])


  return (
    <div className='memory-page' >
      <p>{memoryData.name}</p>
      <p>{memoryData.stack}</p>
      <p>{memoryData.features}</p>
      <p>{memoryData.githubUrl}</p>
      <p>{memoryData.url}</p>
      <p>{memoryData.createdAt}</p>

    </div>
  )
}

export default Memory


