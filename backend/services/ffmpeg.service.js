const { spawn } = require("child_process");
const path = require("path");

function extractAudio(jobFolder, inputFile) {
    return new Promise((resolve, reject) => {
        const inputPath = path.join(jobFolder, inputFile);
        const outputPath = path.join(jobFolder, "audio.wav");

        const ffmpeg = spawn("ffmpeg", [
            "-y",

            "-i",
            inputPath,

            "-vn",

            "-acodec",
            "pcm_s16le",

            "-ar",
            "44100",

            "-ac",
            "2",

            outputPath,
        ]);

        let stderr = "";

        ffmpeg.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        ffmpeg.on("error", (err) => {
            reject(err);
        });

        ffmpeg.on("close", (code) => {
            if (code !== 0) {
                return reject(
                    new Error(
                        `FFmpeg exited with code ${code}\n\n${stderr}`
                    )
                );
            }

            resolve(outputPath);
        });
    });
}

module.exports = {
    extractAudio,
};