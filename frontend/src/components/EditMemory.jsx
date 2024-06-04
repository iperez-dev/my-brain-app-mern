import { useContext, useState } from 'react';
import { GlobalContext } from "../context/globalContext"
import { useParams } from "react-router-dom" 

function MemoryForm() {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [stack, setStack] = useState('')
    const [features, setFeatures] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const { workouts, setWorkouts } = useContext(GlobalContext)

    const { id } = useParams()

    //UPDATE
    const updateWorkout = async (id) => {
        // e.preventDefault()

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('stack', stack);
            formData.append('features', features);
            formData.append('githubUrl', githubUrl);
            if (image) { formData.append('image', image); }

            const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
                method: "UPDATE",
                body: formData,
            })
            
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || "Network response error")
            }
            const json = await response.json()
            if (response.ok) {
                setName('')
                setUrl('')
                setStack('')
                setFeatures('')
                setGithubUrl('')
                setImage(null)
                setWorkouts([json, ...workouts]);
                setEmptyFields([])
                setError(null)
            }
        } catch (error) {
            setError("Error creating workout: " + error.message)
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

                <label>Github URL</label>
                <input
                    type="text"
                    onChange={(e) => setGithubUrl(e.target.value)}
                    value={githubUrl}
                    className={emptyFields.includes('githubUrl') ? 'error' : " "}
                />

                <label form='imgUpload'>Upload Image</label>
                <input
                    type="file"
                    id="imageUpload"
                    name="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={emptyFields.includes('image') ? 'error' : " "}
                />
                <button type='submit'>Submit Change</button>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
        </>
    )
}

export default MemoryForm