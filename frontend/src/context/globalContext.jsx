// Dependencies
import { createContext, useState, useEffect } from "react";
import Axios from "axios";

// Create Global Context
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [memories, setMemories] = useState([]);
  const [query, setQuery] = useState("");

  // FETCH ALL MEMORIES
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await Axios.get(
          "https://my-brain-app-mern-backend.onrender.com/api/memories"
        );

        // Error handling
        if (response.status !== 200) {
          throw new Error("Failed to fetch data on try{} block");
        }
        console.log(response.data);

        // Set response to local state
        setMemories(response.data);

      } catch (error) {
        console.error("Network error fetching Memories: " + error.message);
      }
    };
    fetchMemories();
  }, []);

  // SET QUERY VALUE OF SEARCH TO LOCAL STATE
  const handleInputChange = (event) => {
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
