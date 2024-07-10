import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import { Link } from "react-router-dom"
import { formatDistance } from "date-fns";


function MemoryCard({ name, stack, features, url, githubUrl, image, createdAt, _id }) {
  const { setMemories } = useContext(GlobalContext)

  console.log('MemoryCard id:', _id)

  //DELETE
  const deleteMemory = async (id) => {

    try {
      const response = await fetch(`http://localhost:8000/api/memories/${id}`, {
        method: "DELETE",
        
      })
      if (response.ok) {
        setMemories((prevMemories) => prevMemories.filter((memory) => memory._id !== id));
      } else {
        const json = await response.json();
        throw new Error(json.error);
      }
    } catch (error) {
      console.error("Error deleting Memory:", error);
    }
  }

  const handleClick = async () => {
    try {
      await deleteMemory(_id)
    } catch (error) {
      console.log('Failed to delete Memory:', error)
    }
  }
 

  return (
    <div className="memory-details">
      <div >
        <Link to={`${_id}`}>  <img className="card-image" src={image} alt={name} /> </Link>
      </div>
      <div className="card-description">
        <Link to={`${_id}`}><h4>{name}</h4></Link>
        <p><strong>Stack: </strong>{stack}</p>
        <p><strong>Notes: </strong>{features}</p>
        <p><a href={githubUrl} target="_blank"><strong>GitHub</strong></a></p>
        <p>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</p>
        <span className='material-symbols-outlined' onClick={ handleClick }>delete</span>
      </div>
    </div>
  )
}

export default MemoryCard


