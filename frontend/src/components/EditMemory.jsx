import { useContext, useState } from 'react';
import { GlobalContext } from "../context/globalContext"
import { useParams } from "react-router-dom" 
import { useAuthContext } from '../hooks/useAuthContext';

function MemoryForm() {   
    const [name, setName] = useState('');
    const [stack, setStack] = useState('');
    const [features, setFeatures] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { workouts, setWorkouts } = useContext(GlobalContext);
    const { id } = useParams();
    const { user } = useAuthContext()

    const updateWorkout = async (e) => {
        // e.preventDefault();
        
        if (!user) {
            return
        }

         // Create an object to hold the fields to update
         const updatedFields = {};
         if (name) updatedFields.name = name;
         if (stack) updatedFields.stack = stack;
         if (features) updatedFields.features = features;

        try {
            const response = await fetch(`http://localhost:8000/api/workouts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(updatedFields)
            });

            const updatedWorkout = await response.json();

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
        <form className='create'  onSubmit={updateWorkout} >
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
        <form action="">
            
        </form>
        </>
    )
}

export default MemoryForm