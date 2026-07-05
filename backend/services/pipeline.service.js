const path = require("path");

const { extractAudio } = require("./ffmpeg.service");
const { generateFingerprint } = require("./fingerprint.service");
const { identifyFingerprint } = require("./metadata.service");
const { transcribeAudio } = require("./transcription.service");

async function processUpload(jobFolder, uploadedFilename) {

    const originalAudioPath = path.join(
        jobFolder,
        uploadedFilename
    );

    // Generate fingerprint from original file
    const fingerprint = await generateFingerprint(
        originalAudioPath
    );

    // Try AcoustID
    const match = await identifyFingerprint(
        fingerprint
    );

    // If found, don't run Whisper
    if (match.found) {
        return {
            status: "identified",

            fingerprint,

            match,

            audioPath: null,
            transcript: null
        };
    }

    // Extract WAV
    await extractAudio(
        jobFolder,
        uploadedFilename
    );

    const audioPath = path.join(
        jobFolder,
        "audio.wav"
    );

    // Whisper fallback
    const transcript = await transcribeAudio(
        audioPath
    );

    return {
        status: "transcribed",

        fingerprint,

        match,

        audioPath,

        transcript
    };
}

module.exports = {
    processUpload,
};