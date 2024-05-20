import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../context/globalContext'

function WorkoutCard({ workout }) {

  const { deleteWorkout } = useContext(GlobalContext)

  const handleClick = async () => {
    try{
      await deleteWorkout(workout._id)
    }catch (error){
      console.log('Failed to delete workout:', error)
    }
  }

  return (
    <div className="workout-details">
        <h4>{workout.name}</h4>
        <p><strong>Description: </strong>{workout.description}</p>
        <p><strong>Url: </strong>{workout.url}</p>
        <p>{workout.createdAt}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>    
    </div>
  )
}

export default WorkoutCard