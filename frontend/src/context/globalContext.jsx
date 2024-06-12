import { createContext, useState, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

// components
import MemoryCard from "../components/MemoryCard"
import MemoryForm from "../components/MemoryForm"




export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const [workouts, setWorkouts] = useState([])
    const [query, setQuery] = useState("")
    const { user } = useAuthContext()


    // GET ALL
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/workouts", {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) {
                    throw new Error("Network response error" + json.error)
                }
                const json = await response.json()
                setWorkouts(json)
            } catch (error) {
                throw new Error("Network error fetching workouts: " + error.message)
            }
        }
        if (user){
            fetchWorkouts()
        }
        
    }, [user])


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



