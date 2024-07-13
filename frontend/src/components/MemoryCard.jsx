import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import Axios from "axios";

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

  console.log("MemoryCard id:", _id);

  //DELETE
  const deleteMemory = async (id) => {
    try {
      const response = await Axios.delete(`https://my-brain-app-mern-backend.onrender.com/api/memories/${id}`);
      if (response.status === 200) {
        setMemories((prevMemories) =>
          prevMemories.filter((memory) => memory._id !== id)
        );
      } else {
        throw new Error("Failed to delete memory");
      }
    } catch (error) {
      console.error("Error deleting Memory:", error);
    }
  };

  const handleClick = async () => {
    try {
      await deleteMemory(_id);
    } catch (error) {
      console.log("Failed to delete Memory:", error);
    }
  };

  return (
    <div className="w-[100%] flex flex-col md:flex-row bg-white p-5 my-6 rounded-lg drop-shadow-md">
      <div className="w-[100%] flex flex-col md:flex-row justify-start">
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
        <div className="w-[100%] md:w-[60%] md:ml-6 flex-col">
          <Link to={`${_id}`}>
            <h4 className="text-xl font-bold text-sky-500">{name}</h4>
          </Link>
          <p>
            <strong>Stack: </strong>
            {stack}
          </p>
          <p>
            <strong>Notes: </strong>
            {features}
          </p>
          <p>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <strong>GitHub</strong>
            </a>
          </p>
          <p>
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>

      <div>
        <span className="material-symbols-outlined cursor-pointer" onClick={handleClick}>
          delete
        </span>
      </div>
    </div>
  );
}

export default MemoryCard;
