const youtubeService = require("../services/youtube");

module.exports = {
  async saveVideo(ctx) {
    try {
      console.log("🔹 Full Request Body:", ctx.request.body);

      const { videoUrl } = ctx.request.body;
      console.log("🔹 Received video URL:", videoUrl);

      if (!videoUrl) {
        console.warn("⚠️ Missing video URL");
        return ctx.badRequest("Video URL is required");
      }

      // Extract video ID
      const videoId = youtubeService.extractVideoId(videoUrl);
      if (!videoId) {
        console.warn("⚠️ Unable to extract video ID from URL:", videoUrl);
        return ctx.badRequest("Invalid YouTube URL");
      }

      console.log("✅ Extracted Video ID:", videoId);
      console.log("🔹 Checking if video already exists...");

      const existingVideo = await strapi.entityService.findMany(
        "api::youtube.youtube",
        {
          filters: { videoUrl }, // Search by video URL
        }
      );

      if (existingVideo.length > 0) {
        console.log("ℹ️ Video already exists:", existingVideo[0]);

        // Check if any field is missing
        if (
          !existingVideo[0].title ||
          !existingVideo[0].description ||
          !existingVideo[0].videoId ||
          !existingVideo[0].views ||
          !existingVideo[0].publishedAt
        ) {
          console.log("🔹 Some fields are missing, fetching video details...");

          const videoData = await youtubeService.fetchVideoDetails(videoId);
          console.log(JSON.stringify(videoData), "videoData");

          if (!videoData) {
            console.warn("⚠️ Video not found on YouTube:", videoId);
            return ctx.notFound("Video not found");
          }

          console.log("🔹 Updating existing video in Strapi...");
          const updatedVideo = await strapi.entityService.update(
            "api::youtube.youtube",
            existingVideo[0].id,
            {
              data: {
                title: videoData.title,
                description: videoData.description,
                videoId,
                views: videoData.view,
                date: videoData.date,
              },
            }
          );

          console.log("✅ Video updated successfully:", updatedVideo);
          return ctx.send({ message: "Video updated", data: updatedVideo });
        }

        return ctx.send({
          message: "Video already exists",
          data: existingVideo[0],
        });
      }

      // Fetch video details for new video
      console.log("🔹 Fetching video details...");
      const videoData = await youtubeService.fetchVideoDetails(videoId);

      if (!videoData) {
        console.warn("⚠️ Video not found on YouTube:", videoId);
        return ctx.notFound("Video not found");
      }
      console.log("videoData",videoData,"videoData")
      // Save video in Strapi
      console.log("🔹 Saving new video in Strapi...");
      const newVideo = await strapi.entityService.create(
        "api::youtube.youtube",
        {
          data: {
            title: videoData.title,
            description: videoData.description,
            videoUrl,
            videoId,
            views: videoData.view,
            date: videoData.publishedAt,
          },
        }
      );

      console.log("✅ Video saved successfully:", newVideo);
      ctx.send({ success: true, data: newVideo });
    } catch (error) {
      console.error("❌ Error in saveVideo:", error.message);
      ctx.internalServerError("Something went wrong");
    }
  },
};
