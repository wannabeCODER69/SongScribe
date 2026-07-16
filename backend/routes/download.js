const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const FILES = {
  srt: "subtitles.srt",
  txt: "transcript.txt",
  vtt: "subtitles.vtt",
};

router.get("/:format/:jobId", (req, res) => {
  const { format, jobId } = req.params;

  const filename = FILES[format];
  if (!filename) {
    return res.status(404).json({ error: "Unsupported format" });
  }

  if (!/^\d+$/.test(jobId)) {
    return res.status(400).json({ error: "Invalid jobId" });
  }

  const filePath = path.join(__dirname, "..", "jobs", jobId, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  res.download(filePath);
});

module.exports = router;
