import { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const [workouts, setWorkouts] = useState([])
    const [error, setError] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [emptyFields, setEmptyFields] = useState([])


    // fetch all workouts
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/workouts")
                if (!response.ok) {
                    throw new Error("Network response error" + json.error)
                }
                const json = await response.json()
                setWorkouts(json)
                console.log(json)
            } catch (error) {
                setError("Network error fetching workouts: " + error.message)
            }
        }
        fetchWorkouts()
    }, [])

    // post workout
    const createWorkout = async (e) => {

        const workout = { name, description, url }

        try {
            const response = await fetch('http://localhost:8000/api/workouts', {
                method: "POST",
                body: JSON.stringify(workout),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                throw new Error("Network response error" + json.error)
            }
            const json = await response.json()

            if (response.ok) {
                setEmptyFields([])
                setError(null)
                setName('')
                setDescription('')
                setUrl('')
            }

        } catch (error) {
            setError("Error creating workout: " + error.message)
        }

    }

    // delete workout
    const deleteWorkout = async (id) => {

        try {
            const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
                method: "DELETE",
            })
            if (response.ok) {
                setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
            } else {
                const json = await response.json();
                setError(json.error);
            }
        } catch (error) {
            setError("Error deleting workout: " + error.message)
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                workouts,
                setWorkouts,
                error,
                setError,
                deleteWorkout,
                createWorkout,
                name,
                setName,
                description,
                setDescription,
                url,
                setUrl,
                emptyFields,
                setEmptyFields,
                error,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}



