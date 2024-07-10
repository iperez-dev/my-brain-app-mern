import { useContext, useState } from 'react';
import { GlobalContext } from "../context/globalContext"

function MemoryForm() {
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [stack, setStack] = useState('')
    const [features, setFeatures] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const { memories, setMemories } = useContext(GlobalContext)

    //POST
    const createMemory = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('url', url);
            formData.append('stack', stack);
            formData.append('features', features);
            formData.append('githubUrl', githubUrl);
            if (image) { formData.append('image', image); }

            const response = await fetch('http://localhost:8000/api/memories', {
                method: "POST",
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
                setMemories([json, ...memories]);
                setEmptyFields([])
                setError(null)
            }
        } catch (error) {
            setError("Error creating Memory: " + error.message)
        }
    }

    return (
        <>
        
        <form className='create' onSubmit={createMemory} >
            <div className="form">
                <h3>Add to My Brain</h3>

                <label>Name</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ""}
                />

                <label>Project URL</label>
                <input
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    className={emptyFields.includes('url') ? 'error' : " "}
                />

                <label>Tech</label>
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
                <button type='submit'>Add Memory</button>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
        </>
    )
}

export default MemoryForm