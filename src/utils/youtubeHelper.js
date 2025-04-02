module.exports = {
    extractVideoId: (url) => {
      const regex =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    },
  };
  