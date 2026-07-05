const { spawn } = require("child_process");
const path = require("path");

function extractAudio(jobFolder, inputFile) {

    return new Promise((resolve, reject) => {

        const inputPath = path.join(jobFolder, inputFile);
        const outputPath = path.join(jobFolder, "audio.wav");

        const ffmpeg = spawn("ffmpeg", [
            "-y",
            "-i", inputPath,
            "-vn",
            "-acodec", "pcm_s16le",
            "-ar", "16000",
            "-ac", "1",
            outputPath
        ]);

        ffmpeg.stderr.on("data", data => {
            console.log(data.toString());
        });

        ffmpeg.on("close", code => {

            if (code === 0) {
                resolve(outputPath);
            } else {
                reject(new Error("FFmpeg failed."));
            }

        });

    });

}

module.exports = {
    extractAudio
};