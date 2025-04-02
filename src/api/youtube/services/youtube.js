// const axios = require("axios");


// module.exports = {
//   extractVideoId(videoUrl) {
//     console.log("🔹 Extracting video ID from URL:", videoUrl);

//     try {
//       const urlObj = new URL(videoUrl);
//       let videoId = null;

//       // Check for standard YouTube URL
//       if (urlObj.hostname.includes("youtube.com")) {
//         videoId = urlObj.searchParams.get("v"); // Extract from ?v=
//       }
//       // Check for shortened YouTube URL
//       else if (urlObj.hostname.includes("youtu.be")) {
//         videoId = urlObj.pathname.substring(1); // Extract from /videoId
//       }

//       console.log("✅ Extracted Video ID:", videoId);
//       return videoId;
//     } catch (error) {
//       console.error("❌ Error extracting video ID:", error.message);
//       return null;
//     }
//   },
//   async fetchVideoDetails(videoId) {
//     console.log("🔹 Fetching video details for ID:", videoId);
    
//     try {
//       const API_KEY = process.env.YOUTUBE_API_KEY;
//       if (!API_KEY) {
//         throw new Error("❌ YouTube API key is missing!");
//       }

//       const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
//       console.log("🔹 YouTube API URL:", url);

//       const response = await axios.get(url);
//       console.log("🔹 API Response:", response.data);

//       if (!response.data.items || response.data.items.length === 0) {
//         console.warn("⚠️ No video data found for ID:", videoId);
//         return null;
//       }

//       const video = response.data.items[0];
//       return {
//         title: video.snippet?.title || "No Title",
//         description: video.snippet?.description || "No Description",
//         publishedAt: video.snippet?.publishedAt || null,
//       };
//     } catch (error) {
//       console.error("❌ Error fetching video details:", error.response?.data || error.message);
//       return null;
//     }
//   }
  
// };

const axios = require("axios");

module.exports = {
  extractVideoId(videoUrl) {
    console.log("🔹 Extracting video ID from URL:", videoUrl);

    try {
      const urlObj = new URL(videoUrl);
      let videoId = null;

      // Check for standard YouTube URL
      if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v"); // Extract from ?v=
      }
      // Check for shortened YouTube URL
      else if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.substring(1); // Extract from /videoId
      }

      console.log("✅ Extracted Video ID:", videoId);
      return videoId;
    } catch (error) {
      console.error("❌ Error extracting video ID:", error.message);
      return null;
    }
  },
  async fetchVideoDetails(videoId) {
    console.log("🔹 Fetching video details for ID:", videoId);

    try {
      const API_KEY = process.env.YOUTUBE_API_KEY;
      if (!API_KEY) {
        throw new Error("❌ YouTube API key is missing!");
      }

      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      console.log("🔹 YouTube API URL:", url);

      const response = await axios.get(url);
      console.log("🔹 API Response:", response.data);

      if (!response.data.items || response.data.items.length === 0) {
        console.warn("⚠️ No video data found for ID:", videoId);
        return null;
      }

      const video = response.data.items[0];
      console.log("video",video,"video")

      console.log("video.snippet",video.snippet?.title,"video.snippet")
      console.log("video.snippet",video.snippet?.description,"video.snippet")
      console.log("video.snippet",video.snippet?.publishedAt,"video.snippet")
      console.log("video.snippet",video.contentDetails?.duration,"video.snippet")
      console.log("video.snippet",video.statistics?.viewCount,"video.snippet")
      console.log("video.snippet",video.statistics?.likeCount,"video.snippet")
      console.log("video.snippet",video.statistics?.commentCount,"video.snippet")
      return {
        title: video.snippet?.title || "No Title",
        description: video.snippet?.description || "No Description",
        date: video.snippet?.publishedAt || null,
        publishedAt: video.snippet?.publishedAt || null,
        duration: video.contentDetails?.duration || "No Duration",
        view: video.statistics?.viewCount || null,
        likeCount: video.statistics?.likeCount || null,
        commentCount: video.statistics?.commentCount || null,
      };
    } catch (error) {
      console.error("❌ Error fetching video details:", error.response?.data || error.message);
      return null;
    }
  }
};


