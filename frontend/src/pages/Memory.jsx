
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EditBar from "../components/sidebar/EditBar";
import { formatDistance } from "date-fns";
import Axios from "axios";

const Memory = () => {
  const [memoryData, setMemoryData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const handleMemoryList = async () => {
      try {
        const response = await Axios.get(
          `https://my-brain-app-mern-backend.onrender.com/api/memories/${id}`
        );
        setMemoryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    handleMemoryList();
  }, [id]);

  // Extract video ID from the YouTube URL if available
  const videoUrl = memoryData.url || "";
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?si=piiS521f9WOa51PA`
    : "";

  console.log(memoryData);

  const createdAtDate = new Date(memoryData.createdAt);
  const formattedDate = !isNaN(createdAtDate)
    ? formatDistance(createdAtDate, new Date(), { addSuffix: true })
    : "Invalid date";

  return (
    <div className="flex flex-col md:flex-row h-auto w-[85%] mx-auto my-8">
      {/* left-column */}
      <div className="w-12/12 md:w-8/12 h-full bg-white rounded-lg shadow p-8">
        {embedUrl && (
          <div className="video-wrapper">
            <iframe
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <div>
          <h2>{memoryData.name}</h2>
          <p>
            <strong>Keyword: </strong> {memoryData.stack}
          </p>
          <p>
            <strong>Notes: </strong> {memoryData.features}
          </p>
          <Link to={memoryData.githubUrl} target="_blank">
            <strong>Github </strong>
          </Link>
          <p>{formattedDate}</p>
          <div className="card-description"></div>
        </div>
      </div>

      {/* right-column */}
      <EditBar />
    </div>
  );
};

export default Memory;
