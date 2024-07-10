import MemoryCard from "../components/MemoryCard";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Sidebar from "../components/sidebar/Sidebar";

function Home() {
  const { workouts, query } = useContext(GlobalContext);

  //SEARCH
  const filteredProducts = query
    ? workouts.filter((workout) =>
        workout.stack.toLowerCase().includes(query.toLowerCase())
      )
    : workouts;

  return (
    <div className="home">
      <div className="workouts">
        {filteredProducts.map(
          ({
            name,
            stack,
            features,
            url,
            githubUrl,
            image,
            _id,
            createdAt,
          }) => (
            <MemoryCard
              key={_id}
              name={name}
              stack={stack}
              features={features}
              url={url}
              githubUrl={githubUrl}
              image={image}
              createdAt={createdAt}
              _id={_id}
            />
          )
        )}
        ;
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
