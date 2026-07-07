const path = require("path");
const fs = require("fs").promises;

const { extractAudio } = require("./ffmpeg.service");
const { generateFingerprint } = require("./fingerprint.service");
const { identifyFingerprint } = require("./metadata.service");
const { transcribeAudio } = require("./transcription.service");
const { generateTXT, generateSRT, generateVTT } = require("./subtitle.service");
const { getSynchronizedLyrics } = require("./lyrics.service");
const { parseLRC } = require("./lrc.service");

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

    // Try synchronized lyrics if AcoustID match is found
    if (match.found) {
        try {
            const syncedLyrics = await getSynchronizedLyrics(match);
            if (syncedLyrics) {
                const transcript = parseLRC(syncedLyrics);

                // Write transcript.json and generate TXT/SRT/VTT
                await fs.writeFile(
                    path.join(jobFolder, "transcript.json"),
                    JSON.stringify(transcript, null, 4),
                    "utf8"
                );

                await Promise.all([
                    generateTXT(transcript, jobFolder),
                    generateSRT(transcript, jobFolder),
                    generateVTT(transcript, jobFolder)
                ]);

                return {
                    status: "lyrics",
                    fingerprint,
                    match,
                    audioPath: null,
                    transcript
                };
            }
        } catch (err) {
            console.error("[LYRICS PIPELINE ERROR] Failed to fetch or generate lyrics. Falling back to Whisper.", err);
        }
    }

    // Extract WAV (Whisper fallback)
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

    try {
        await Promise.all([
            generateTXT(transcript, jobFolder),
            generateSRT(transcript, jobFolder),
            generateVTT(transcript, jobFolder)
        ]);
    } catch (err) {
        console.error("[SUBTITLE GENERATION ERROR]", err);
    }

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