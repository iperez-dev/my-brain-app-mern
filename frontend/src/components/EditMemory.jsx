import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../context/globalContext"
import { useParams } from "react-router-dom" 

function MemoryForm() {
    // const [name, setName] = useState('')
    // const [url, setUrl] = useState('')
    // const [stack, setStack] = useState('')
    // const [features, setFeatures] = useState('')
    // const [githubUrl, setGithubUrl] = useState('')
    // const [image, setImage] = useState(null)
    // const [error, setError] = useState(null)
    // const [emptyFields, setEmptyFields] = useState([])

    // const { workouts, setWorkouts } = useContext(GlobalContext)

    // const { id } = useParams()

    // //UPDATE
    // const updateWorkout = async (e) => {
    //     if (e) e.preventDefault();

    //     // Log state values to ensure they're set
    //     console.log("State values:", { name, url, stack, features, githubUrl, image });

    //     try {
    //         const formData = new FormData();
    //         formData.append('name', name);
    //         formData.append('stack', stack);
    //         formData.append('features', features);
    //         formData.append('url', url);
    //         formData.append('githubUrl', githubUrl);
    //         if (image) { formData.append('image', image); }

    //         const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
    //             method: "PATCH",
    //             body: formData,
    //         })
            
    //         if (!response.ok) {
    //             const json = await response.json();
    //             throw new Error(json.error || "Network response error")
    //         }
    //         const json = await response.json()
    //         if (response.ok) {
    //             setName('');
    //             setUrl('');
    //             setStack('');
    //             setFeatures('');
    //             setGithubUrl('');
    //             setImage(null);
    //             setWorkouts(workouts.map(workout => workout._id === id ? json.workout : workout));
    //             setEmptyFields([]);
    //             setError(null);
    //         }
    //     } catch (error) {
    //         setError("Error creating workout: " + error.message)
    //     }
    // }
    // useEffect(() => {
    //     updateWorkout()
    // }, [id])
        
    const [name, setName] = useState('');
    const [stack, setStack] = useState('');
    const [features, setFeatures] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { workouts, setWorkouts } = useContext(GlobalContext);
    const { id } = useParams();

    const updateWorkout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    stack,
                    features
                })
            });

            if (!response.ok) {
                throw new Error('Update request failed');
            }

            const updatedWorkout = await response.json();
            console.log('Updated workout:', updatedWorkout);

            // Update local state with the updated workout
            const updatedWorkouts = workouts.map(workout => {
                if (workout._id === updatedWorkout._id) {
                    return updatedWorkout;
                }
                return workout;
            });
            setWorkouts(updatedWorkouts);

            // Reset form fields and error state
            setName('');
            setStack('');
            setFeatures('');
            setError(null);
            setEmptyFields([]);

        } catch (error) {
            console.error('Update error:', error);
            setError('Error updating workout: ' + error.message);
        }
    }
    return (
        <>
        
        <form className='create' onSubmit={updateWorkout} >
            <div className="form">
                <h3>Edit Memory</h3>

                <label>Name</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ""}
                />

                <label>Stack</label>
                <input
                    type="text"
                    onChange={(e) => setStack(e.target.value)}
                    value={stack}
                    className={emptyFields.includes('stack') ? 'error' : " "}
                />

                <label>Notes</label>
                <input
                    type="text"
                    onChange={(e) => setFeatures(e.target.value)}
                    value={features}
                    className={emptyFields.includes('features') ? 'error' : " "}
                />

                <button type='submit'>Submit Change</button>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
        </>
    )
}

export default MemoryForm