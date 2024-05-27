import MemoryCard from "../components/MemoryCard"
import { useContext } from 'react';
import { GlobalContext } from "../context/globalContext"
import Sidebar from "../components/sidebar/Sidebar"


function Home() {
    
    const { workouts, query } = useContext(GlobalContext)

    const filteredItems = workouts.filter((workout) => workout.stack.toLowerCase().indexOf(query.toLowerCase() !== -1))
  
    function filteredData(workouts, query) {
        let filteredProducts = workouts
        if (query) {
            filteredProducts = filteredItems
        }

        return filteredProducts.map(({ name, stack, features, url, githubUrl, image, _id, createdAt }) => (
            <MemoryCard 
            key={_id}
            name={name}
            stack={stack}
            features={features}
            url={url}
            githubUrl={githubUrl}
            image={image}
            createdAt={createdAt}
            />
        ))
    }

    const result = filteredData(workouts, query)
   
//

    return (
        <div className="home">
            <div className="workouts">
                {
                    workouts.map(workout => (
                        < MemoryCard key={workout._id}  workout={workout} />
                    ))
                }

            </div>
            
            <Sidebar />
            
        </div>
    )
}

export default Home