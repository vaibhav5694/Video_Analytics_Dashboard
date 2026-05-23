import React, { useState, useEffect } from "react";
import api from "./services/api";
import VideoForm from "./components/VideoForm";
import VideoTable from "./components/VideoTable";

function App() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const res = await api.get("/");
    setVideos(res.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Educational Video Analytics</h1>
      <VideoForm refresh={fetchVideos} />
      <VideoTable videos={videos} />
    </div>
  );
}

export default App;
