import MemoryCard from "../components/MemoryCard";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import Sidebar from "../components/sidebar/Sidebar";

function Home() {
  const { memories, query } = useContext(GlobalContext);

  //SEARCH
  const filteredProducts = query
    ? memories.filter((memory) =>
        memory.stack.toLowerCase().includes(query.toLowerCase())
      )
    : memories;

  return (
    <div className="home">
      <div >
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
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
