import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'

function MemoryCard({ workout }) {
  const { setWorkouts, result } = useContext(GlobalContext)


  //DELETE
  const deleteWorkout = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
        method: "DELETE",
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
      await deleteWorkout(workout._id)
    } catch (error) {
      console.log('Failed to delete workout:', error)
    }
  }
  ///

  return (
    <div className="workout-details">
      <div >
        <a href={workout.url} target="_blank"><img className="card-image" src={workout.image} alt={workout.name} /></a>
      </div>
      <div className="card-description">
        <h4><a href={workout.url} target="_blank">{workout.name}</a></h4>
        <p><strong>Stack: </strong>{workout.stack}</p>
        <p><strong>Notes: </strong>{workout.features}</p>
        <p><a href={workout.githubUrl} target="_blank"><strong>GitHub</strong></a></p>
        <p>{workout.createdAt}</p>
        <span className='material-symbols-outlined' onClick={ handleClick }>delete</span>
      </div>
    </div>
  )
}

export default MemoryCard


