
import { useContext, useState } from 'react';
import { GlobalContext } from "../context/globalContext";
import { useParams, Link } from "react-router-dom"; 
import Axios from "axios"

function MemoryForm() {   
    const [name, setName] = useState('');
    const [stack, setStack] = useState('');
    const [features, setFeatures] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { memories, setMemories } = useContext(GlobalContext);
    const { id } = useParams();
    console.log(id)

    const updateMemory = async (e) => {
        e.preventDefault();
    
        // Create an object to hold the fields to update
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (stack) updatedFields.stack = stack;
        if (features) updatedFields.features = features;
    
        try {
            const response = await Axios.put(`https://my-brain-app-mern-backend.onrender.com/api/memories/${id}`, updatedFields, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status !== 200) {
                throw new Error('Failed to update memory');
            }
    
            const updatedMemory = response.data;
            console.log(updatedMemory);
    
            // Update local state with the updated Memory
            const updatedMemories = memories.map(memory => {
                if (memory._id === updatedMemory._id) {
                    return updatedMemory;
                }
                return memory;
            });
            setMemories(updatedMemories);
    
            // Reset form fields and error state
            setName('');
            setStack('');
            setFeatures('');
            setError(null);
            setEmptyFields([]);
    
            // Optionally, you may not need to reload the page
            window.location.reload();
    
        } catch (error) {
            console.error('Update error:', error);
            setError('Error updating Memory: ' + error.message);
        }
    }

    return (
        <>
        <form className='create' onSubmit={updateMemory}>
            <div className="form">
                <Link to="/"><h1>My Brain</h1></Link>
                
                <h1>Edit Memory</h1>

                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('name') ? 'error' : ""}
                    placeholder='Name'
                />

                <input
                    type="text"
                    onChange={(e) => setStack(e.target.value)}
                    value={stack}
                    className={emptyFields.includes('stack') ? 'error' : ""}
                    placeholder='Stack'
                />

                <input
                    type="text"
                    onChange={(e) => setFeatures(e.target.value)}
                    value={features}
                    className={emptyFields.includes('features') ? 'error' : ""}
                    placeholder='Notes'
                />

                <button type='submit'>Submit Change</button>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
        </>
    )
}

export default MemoryForm;