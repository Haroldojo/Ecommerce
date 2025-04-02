// const { exec } = require("child_process");
// const path = require("path");

// module.exports = {
//   async speak(ctx) {
//     try {
//       const { text, lang = "en" } = ctx.request.body;

//       if (!text) {
//         return ctx.badRequest("Text is required");
//       }

//       const outputPath = path.join(__dirname, "../../../public/tts_output.wav");
//       const command = `espeak -v ${lang} -w ${outputPath} "${text}"`;

//       exec(command, (error) => {
//         if (error) {
//           return ctx.internalServerError("TTS conversion failed", error);
//         }

//         return ctx.send({ url: `/uploads/tts_output.wav` });
//       });
//     } catch (error) {
//       return ctx.internalServerError("Something went wrong", error);
//     }
//   },
// };
