import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import EditBar from "../components/sidebar/EditBar"


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

  // Extract video ID from the YouTube URL if available
  const videoUrl = memoryData.url || '';
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?si=piiS521f9WOa51PA` : '';


  return (
    <div className='home' >
      <div className="workouts">
        <div className='memory-card' >
          
          {embedUrl && (
            <div className='video-wrapper'>
            <iframe
              // width='560'
              // height='315'
              src={embedUrl}
              title='YouTube video player'
              // frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
            </div>
          )}

          <h2>{memoryData.name}</h2>
          <p> <strong>Stack: </strong> {memoryData.stack}</p>
          <p><strong>Notes: </strong> {memoryData.features}</p>
          <Link to={memoryData.githubUrl} target='_blank'><strong>Github </strong></Link>
          <p> <strong>Created: </strong> {memoryData.createdAt}</p>
          <div className='card-description' >
          </div>
        </div>
      </div>
      <EditBar />
    </div>
  )
}

export default Memory


