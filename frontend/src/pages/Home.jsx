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
    <div className=" body md:h-[100vh] lg:w-[80%] w-[90%] mx-auto flex flex-col-reverse md:flex-row ">
      {/* left-column */}
      <div className=" left-column w-[90%] md:w-[60%] flex-auto mx-auto  ">
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
      {/* right-column */}
      <div className="right-column w-[90%] md:w-[40%] flex mt-10 mx-auto" ><Sidebar/></div>
      
    </div>
  );
}

export default Home;
