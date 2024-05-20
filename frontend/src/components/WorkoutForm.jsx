import React from 'react'
import { useContext } from 'react';
import { GlobalContext } from "../context/globalContext"

function WorkoutForm() {

    const { createWorkout, name, setName, description, setDescription, url, setUrl, emptyFields, setEmptyFields, error,  } = useContext(GlobalContext)

    return (
        <form className='create' onSubmit={createWorkout} >
            <h3>Add to My Brain</h3>

            <label>Name</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error': ""}
            />

            <label>Description</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error': " "}
            />

            <label>URL</label>
            <input
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                className={emptyFields.includes('url') ? 'error': " "}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm