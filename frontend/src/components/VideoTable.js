import React from "react";

export default function VideoTable({ videos }) {
  // अगर कोई वीडियो नहीं है, तो टेबल दिखाने के बजाय प्यारा सा मैसेज दिखाओ
  if (!videos || !Array.isArray(videos) || videos.length === 0) {
    return (
      <p style={{ padding: "20px", color: "#666", fontStyle: "italic" }}>
        अभी तक कोई वीडियो एनालाइज नहीं किया गया है। ऊपर यूआरएल डालकर शुरू करें!
      </p>
    );
  }

  return (
    <table border="1" cellPadding="10" width="100%" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
          <th>Video Title</th>
          <th>Total Comments</th>
          <th>Positive 👍</th>
          <th>Negative 👎</th>
          <th>Sentiment Score</th>
        </tr>
      </thead>
      <tbody>
        {videos.map((v, index) => (
          <tr key={index}>
            {/* आपके FastAPI से आने वाले असली नाम (Keys) अब यहाँ मैच हो रहे हैं */}
            <td style={{ fontWeight: "bold" }}>{v.title || "YouTube Video"}</td>
            <td>{v.total_comments ?? 0}</td>
            <td style={{ color: "green" }}>{v.positive_comments ?? 0}</td>
            <td style={{ color: "red" }}>{v.negative_comments ?? 0}</td>
            <td>
              <span style={{
                padding: "4px 8px", 
                borderRadius: "4px", 
                backgroundColor: v.sentiment_score >= 0.5 ? "#e6ffed" : "#ffeef0",
                color: v.sentiment_score >= 0.5 ? "green" : "red",
                fontWeight: "bold"
              }}>
                {v.sentiment_score ?? 0}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

