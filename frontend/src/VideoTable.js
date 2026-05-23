import React from "react";

export default function VideoTable({ videos }) {
  // 🕵️ यह लाइन टर्मिनल/ब्राउज़र कंसोल में प्रिंट करेगी कि 'videos' में असल में क्या आ रहा है
  console.log("VideoTable को मिला हुआ डेटा:", videos);

  // 1. अगर डेटा एक असली Array (लिस्ट) है, तो उसे सीधे इस्तेमाल करो
  // 2. अगर डेटा एक Object है और उसके अंदर कोई लिस्ट छुपी है (जैसे FastAPI का { data: [...] }), तो उसे निकालो
  // 3. अगर कुछ भी समझ न आए, तो इसे एक खाली लिस्ट [] मान लो ताकि ऐप क्रैश न हो
  let safeVideos = [];
  
  if (Array.isArray(videos)) {
    safeVideos = videos;
  } else if (videos && typeof videos === 'object') {
    // अगर बैकएंड से ऑब्जेक्ट आ रहा है, तो ढूंढो कि लिस्ट कहाँ है
    safeVideos = videos.videos || videos.data || Object.values(videos).find(Array.isArray) || [];
  }

  // अगर सब कुछ करने के बाद भी लिस्ट खाली है, तो प्यारा सा मैसेज दिखा दो
  if (safeVideos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
        <p>कोई वीडियो डेटा नहीं मिला या बैकएंड से गलत फॉर्मेट आ रहा है।</p>
        <p style={{ fontSize: "12px" }}>कंसोल (F12) चेक करें कि बैकएंड ने क्या भेजा है।</p>
      </div>
    );
  }

  return (
    <table border="1" cellPadding="10" width="100%" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th>Title</th>
          <th>Views</th>
          <th>Likes</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        {safeVideos.map((v, index) => (
          <tr key={index}>
            <td>{v?.title || "No Title"}</td>
            <td>{v?.views ?? 0}</td>
            <td>{v?.likes ?? 0}</td>
            <td>{v?.comments ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

