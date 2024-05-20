import React from 'react'
// import { useState, useEffect } from "react"
import WorkoutCard from "../components/WorkoutCard"
import WorkoutForm from "../components/WorkoutForm"
import { useContext } from 'react';
import { GlobalContext } from "../context/globalContext"

function Home() {
    
    const { workouts } = useContext(GlobalContext)

    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts.map(workout => (
                        < WorkoutCard key={workout._id} workout={workout}  />
                    ))
                }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home