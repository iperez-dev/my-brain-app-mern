// DEPENDENCIES
import { useContext, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import Axios from "axios";

function MemoryForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [stack, setStack] = useState("");
  const [features, setFeatures] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { memories, setMemories } = useContext(GlobalContext);

  // SENDS POST REQUEST
  const createMemory = async (e) => {
    e.preventDefault();

    try {
      // Create FormData object and appends form input values
      const formData = new FormData();
      formData.append("name", name);
      formData.append("url", url);
      formData.append("stack", stack);
      formData.append("features", features);
      formData.append("githubUrl", githubUrl);
      if (image) {
        formData.append("image", image);
      }

      // Post request with FormData values
      const response = await Axios.post(
        "https://my-brain-app-mern-backend.onrender.com/api/memories",
        formData
      );

      // Empty form fields once the from submits
      setName("");
      setUrl("");
      setStack("");
      setFeatures("");
      setGithubUrl("");
      setImage(null);
      setEmptyFields([]);
      setError(null);
      // Adds new memory to memory list. Update local state
      setMemories([response.data, ...memories]);

      // Handles error
      if (response.status !== 200) {
        throw new Error("Failed to fetch data on try{} block");
      }
    } catch (error) {
      setError("Error creating Memory: " + error.message);
    }
  };

  return (
    <>
      <p>Add to My Brain</p>
      {/* form */}
      <form className="create" onSubmit={createMemory}>
        <div className="form">

          {/* Name */}
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes("name") ? "error" : ""}
            placeholder="Add Name"
          />

          {/* video URL */}
          <input
            type="text"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            className={emptyFields.includes("url") ? "error" : " "}
            placeholder="Memory URL"
            required
          />

          {/* Search Term */}
          <input
            type="text"
            onChange={(e) => setStack(e.target.value)}
            value={stack}
            className={emptyFields.includes("stack") ? "error" : " "}
            placeholder="Search term"
            required
          />

          {/* Notes */}
          <input
            type="text"
            onChange={(e) => setFeatures(e.target.value)}
            value={features}
            className={emptyFields.includes("features") ? "error" : " "}
            placeholder="Notes"
          />

          {/* GitHub URL */}
          <input
            type="text"
            onChange={(e) => setGithubUrl(e.target.value)}
            value={githubUrl}
            className={emptyFields.includes("githubUrl") ? "error" : " "}
            placeholder="GitHub URL"
          />

          {/* Image upload */}
          <label form="imgUpload"></label>
          <input
            type="file"
            id="imageUpload"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
            className={emptyFields.includes("image") ? "error" : " "}
            placeholder="Upload Image"
          />

          {/* Submit buttom */}
          <button type="submit">Add Memory</button>
          {error && <div className="error">{error}</div>}
          
        </div>
      </form>
    </>
  );
}

export default MemoryForm;
