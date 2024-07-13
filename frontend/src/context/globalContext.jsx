import { createContext, useState, useEffect } from 'react';
import Axios from "axios";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [memories, setMemories] = useState([]);
    const [query, setQuery] = useState("");

    // GET ALL
    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await Axios.get("https://my-brain-app-mern-backend.onrender.com/api/memories");
                setMemories(response.data);
            } catch (error) {
                console.error("Network error fetching Memories: " + error.message);
            }
        };
        fetchMemories();
    }, []);

    //SET QUERY VALUE
    const handleInputChange = event => {
        setQuery(event.target.value);
    };

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
    );
}
