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
  const originalAudioPath = path.join(jobFolder, uploadedFilename);

  console.log("[PIPELINE] Starting upload pipeline");

  // Generate fingerprint from original file
  const fingerprint = await generateFingerprint(originalAudioPath);
  console.log("[PIPELINE] ✓ Fingerprint generated");

  // Try AcoustID
  const match = await identifyFingerprint(fingerprint);
  console.log("[PIPELINE] ✓ AcoustID lookup complete");
  console.log("[PIPELINE] Match found:", match.found);

  // Try synchronized lyrics if AcoustID match is found
  if (match.found) {
    try {
      console.log("[PIPELINE] Attempting synchronized lyrics...");

      const syncedLyrics = await getSynchronizedLyrics(match);

      if (syncedLyrics) {
        console.log("[PIPELINE] ✓ Synced lyrics found");

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
          generateVTT(transcript, jobFolder),
        ]);

        console.log("[PIPELINE] ✓ Subtitle files generated from lyrics");

        return {
          status: "lyrics",
          fingerprint,
          match,
          audioPath: null,
          transcript,
        };
      }

      console.log("[PIPELINE] No synchronized lyrics found. Falling back to Whisper.");
    } catch (err) {
      console.error(
        "[LYRICS PIPELINE ERROR] Failed to fetch or generate lyrics. Falling back to Whisper.",
        err
      );
    }
  } else {
    console.log("[PIPELINE] No AcoustID match. Falling back to Whisper.");
  }

  // Extract WAV (Whisper fallback)
  console.log("[PIPELINE] Extracting WAV...");
  await extractAudio(jobFolder, uploadedFilename);
  console.log("[PIPELINE] ✓ WAV extracted");

  const audioPath = path.join(jobFolder, "audio.wav");

  // Whisper fallback
  console.log("[PIPELINE] Starting Whisper transcription...");
  const transcript = await transcribeAudio(audioPath);
  console.log("[PIPELINE] ✓ Whisper transcription complete");

  try {
    console.log("[PIPELINE] Generating subtitle files...");

    await Promise.all([
      generateTXT(transcript, jobFolder),
      generateSRT(transcript, jobFolder),
      generateVTT(transcript, jobFolder),
    ]);

    console.log("[PIPELINE] ✓ Subtitle files generated");
  } catch (err) {
    console.error("[SUBTITLE GENERATION ERROR]", err);
  }

  console.log("[PIPELINE] Upload pipeline completed successfully");

  return {
    status: "transcribed",
    fingerprint,
    match,
    audioPath,
    transcript,
  };
}

module.exports = {
  processUpload,
};
