import React, { useState } from "react";
import api from "../services/api";

export default function VideoForm({ onAnalysisComplete }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return alert("कृपया YouTube URL डालें!");

    setLoading(true);
    try {
      // 405 एरर फिक्स: अब यह सीधे /analyze वाले POST रूट पर जाएगा
      const res = await api.post("/analyze", { video_url: url });
      
      // पैरेंट (App.js) को नया डेटा भेजें ताकि स्क्रीन अपडेट हो जाए
      onAnalysisComplete(res.data);
      setUrl(""); // इनपुट बॉक्स खाली करें
      alert("एनालिसिस पूरा हुआ!");
    } catch (error) {
      console.error("सबमिट करने में एरर आई:", error);
      alert("कुछ गड़बड़ हुई! कृपया चेक करें कि बैकएंड चल रहा है या नहीं।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <div style={{ display: "flex", gap: "10px", maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="यहाँ YouTube Video URL पेस्ट करें..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </form>
  );
}