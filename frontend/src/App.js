import React, { useEffect, useState } from "react";
import api from "./services/api";
import VideoForm from "./components/VideoForm";
import VideoTable from "./components/VideoTable";
import VideoChart from "./components/VideoChart";

function App() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/");
      // शुरुआत में अगर खाली लिस्ट आए तो सेट करें
      if (Array.isArray(res.data)) {
        setVideos(res.data);
      }
    } catch (error) {
      console.error("डेटा लोड करने में समस्या:", error);
      setVideos([]);
    }
  };

  // जब फॉर्म सबमिट हो और नया वीडियो डेटा आए, तो उसे लिस्ट में जोड़ें
  const handleNewVideoData = (newVideo) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>Educational Video Analytics Dashboard</h1>

      {/* फॉर्म को फंक्शन दे रहे हैं ताकि नया डेटा मिलते ही ऐप अपडेट हो */}
      <VideoForm onAnalysisComplete={handleNewVideoData} />

      <h2>Video Metrics</h2>
      <VideoTable videos={videos} />

      <h2 style={{ marginTop: "40px" }}>Views Analysis</h2>
      <VideoChart videos={videos} />
    </div>
  );
}

export default App;

