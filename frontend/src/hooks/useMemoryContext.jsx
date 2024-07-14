// Dependencies
import { GlobalContext } from '../context/globalContext'
import { useContext } from 'react'

export const useMemoryContext = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw Error('useMemoryContext must be used inside an MemoriesContextProvider')
  }

  return context
}