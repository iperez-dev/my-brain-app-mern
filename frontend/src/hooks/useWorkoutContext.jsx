import { GlobalContext } from '../context/globalContext'
import { useContext } from 'react'

export const useWorkoutContext = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}