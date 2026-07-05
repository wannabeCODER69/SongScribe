const path = require("path");

const { extractAudio } = require("./ffmpeg.service");
const { generateFingerprint } = require("./fingerprint.service");
const { identifyFingerprint } = require("./metadata.service");

async function processUpload(jobFolder, uploadedFilename) {

    await extractAudio(jobFolder, uploadedFilename);

    const audioPath = path.join(jobFolder, "audio.wav");

    const fingerprint = await generateFingerprint(audioPath);

    const match = await identifyFingerprint(fingerprint);

    return {
        fingerprint,
        match,
    };
}

module.exports = {
    processUpload,
};