// Dependencies
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EditBar from "../components/sidebar/EditBar";
import { formatDistance } from "date-fns";
import Axios from "axios";

const Memory = () => {
  const [memoryData, setMemoryData] = useState([]);

  // Get id out off URL
  const { id } = useParams();

  // Fetch single memory
  useEffect(() => {
    const handleMemoryList = async () => {
      try {
        const response = await Axios.get(
          `https://my-brain-app-mern-backend.onrender.com/api/memories/${id}`
        );

        // Error handling
        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        console.log(response.data);

        // Set response to local state - memoryData
        setMemoryData(response.data);
      } catch (error) {
        // Error handling
        console.error("Error fetching data:", error.message);
      }
    };
    handleMemoryList();
  }, [id]);

  // Extract video ID from the YouTube URL if available
  // Get Video URL
  const videoUrl = memoryData.url || "";

  // Extract video ID from URL
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];

  // Creates embedded link from video URL
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?si=piiS521f9WOa51PA`
    : "";
  console.log(embedUrl);

  // Create a Date object
  const createdAtDate = new Date(memoryData.createdAt);
  // Format the date to show how long ago it was created using date-fns library
  const formattedDate = !isNaN(createdAtDate)
    ? formatDistance(createdAtDate, new Date(), { addSuffix: true })
    : "Invalid date";

  return (
    <>
      {/* body */}
      <div className="flex flex-col md:flex-row h-auto w-10/12 mx-auto my-8">
        {/* left-column */}
        <div className="w-12/12 md:w-8/12 h-full bg-white rounded-lg shadow p-8">
        {/* embedded URL */}
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
          {/* card-info */}
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
    </>
  );
};

export default Memory;
