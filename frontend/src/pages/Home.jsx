import MemoryCard from "../components/MemoryCard"
import MemoryForm from "../components/MemoryForm"
import { useContext } from 'react';
import { GlobalContext } from "../context/globalContext"


function Home() {
    
    const { workouts } = useContext(GlobalContext)

    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts.map(workout => (
                        < MemoryCard key={workout._id} workout={workout}  />
                    ))
                }
            </div>
            <MemoryForm />
            
        </div>
    )
}

export default Home