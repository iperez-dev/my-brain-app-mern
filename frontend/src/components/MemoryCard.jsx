import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'
import { Link } from "react-router-dom"
import { formatDistance } from "date-fns";
import { useAuthContext } from '../hooks/useAuthContext';


function MemoryCard({ name, stack, features, url, githubUrl, image, createdAt, _id }) {
  const { setWorkouts } = useContext(GlobalContext)
  const { user } = useAuthContext()

  console.log('MemoryCard id:', _id)

  //DELETE
  const deleteWorkout = async (id) => {

    if (!user) {
      return
  }
  
    try {
      const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`
      }
      })
      if (response.ok) {
        setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
      } else {
        const json = await response.json();
        throw new Error(json.error);
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  }

  const handleClick = async () => {
    try {
      await deleteWorkout(_id)
    } catch (error) {
      console.log('Failed to delete workout:', error)
    }
  }
 

  return (
    <div className="workout-details">
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


