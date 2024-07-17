// DEPENDENCIES
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import Axios from "axios";

// IMPORT VALUES FROM GLOBAL CONTEXT
function MemoryCard({
  name,
  stack,
  features,
  url,
  githubUrl,
  image,
  createdAt,
  _id,
}) {
  const { setMemories } = useContext(GlobalContext);

  //DELETE SINGLE MEMORY BY ID
  const deleteMemory = async (_id) => {
    try {
      const response = await Axios.delete(
        `https://my-brain-app-mern-backend.onrender.com/api/memories/${_id}`
      );

      // Handles error in request
      if (response.status !== 200) {
        throw new Error("Failed to delete memory of try{} block");
      }

      // Updates local state with new memory list excluding deleted memory
      setMemories((prevMemories) =>
        prevMemories.filter((memory) => memory._id !== _id)
      );
    } catch (error) {
      console.error("Error deleting Memory:" + error.message);
    }
  };

  // RUNS DELETE FUNCTION WHEN BUTTON IS CLICKED
  const handleClick = async () => {
    try {
      await deleteMemory(_id);
    } catch (error) {
      console.log("Failed to delete Memory catch{}:" + error.message);
    }
  };

  return (
    <>
      {/* memory card */}
      <div className="w-[100%] flex flex-col md:flex-row bg-white p-5 my-6 rounded-lg drop-shadow-md">
        <div className="w-[100%] flex flex-col md:flex-row justify-start">
          {/* thumbnail */}
          <div
            className="w-[100%] md:w-[40%] h-[24vh] md:h-[19vh] mb-4 md:mb-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link to={`${_id}`}>
              <div className="h-full w-full"></div>
            </Link>
          </div>
          {/* card info */}
          <div className="w-[100%] md:w-[60%] md:ml-6 flex-col">
            {/* name */}
            <h4 className="text-xl font-bold text-sky-500">{name}</h4>
            {/* serch term */}
            <p>
              <strong>Stack: </strong> {stack}{" "}
            </p>
            {/* notes */}
            <p>
              <strong>Notes: </strong> {features}{" "}
            </p>
            {/* Github URL */}
            <p>
              <Link to={githubUrl} target="_blank" rel="noopener noreferrer"><strong>GitHub</strong></Link>
            </p>
            {/* date */}
            <p>
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
          {/* delete buttom */}
        <div>
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={handleClick}
          >
            delete
          </span>
        </div>
      </div>
    </>
  );
}

export default MemoryCard;
