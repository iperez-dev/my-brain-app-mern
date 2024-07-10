import { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const [workouts, setWorkouts] = useState([])
    const [query, setQuery] = useState("")


    // GET ALL
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/memories")
                if (!response.ok) {
                    throw new Error("Network response error" + json.error)
                }
                const json = await response.json()
                setWorkouts(json)
            } catch (error) {
                throw new Error("Network error fetching workouts: " + error.message)
            }
        }
        fetchWorkouts()
        
        
    }, [])


    //SET QUERY VALUE
    const handleInputChange = event => {
        setQuery(event.target.value);
    }

    return (
        <GlobalContext.Provider
            value={{
                workouts,
                setWorkouts,
                handleInputChange,
                query,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}



