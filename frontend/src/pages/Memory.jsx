import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EditBar from "../components/sidebar/EditBar";
import { formatDistance } from "date-fns";

const Memory = () => {
  const [memoryData, setMemoryData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const handleMemoryList = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/memories/${id}`,
          {}
        );
        const data = await response.json();
        setMemoryData(data);
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
    <div className="home">
      <div className="memory-card">
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

        <h2>{memoryData.name}</h2>
        <p>
          <strong>Stack: </strong> {memoryData.stack}
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

      <EditBar />
    </div>
  );
};

export default Memory;
