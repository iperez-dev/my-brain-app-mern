import { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const [memories, setMemories] = useState([])
    const [query, setQuery] = useState("")


    // GET ALL
    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch("https://my-brain-app-mern-backend.onrender.com/api/memories")
                if (!response.ok) {
                    throw new Error("Network response error" + json.error)
                }
                const json = await response.json()
                setMemories(json)
            } catch (error) {
                throw new Error("Network error fetching Memories: " + error.message)
            }
        }
        fetchMemories()
        
        
    }, [])


    //SET QUERY VALUE
    const handleInputChange = event => {
        setQuery(event.target.value);
    }

    return (
        <GlobalContext.Provider
            value={{
                memories,
                setMemories,
                handleInputChange,
                query,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}



