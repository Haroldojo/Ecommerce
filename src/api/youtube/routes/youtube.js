module.exports = {
  routes: [
    {
      method: "POST",
      path: "/youtube/saveVideo",
      handler: "youtube.saveVideo",
      config: {
        auth: false, // Change to true if authentication is required
        policies: [],
        middlewares: [],
      },
    },
  ],
};
