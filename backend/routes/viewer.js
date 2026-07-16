const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/:jobId/transcript", (req, res) => {
  const { jobId } = req.params;

  if (!/^\d+$/.test(jobId)) {
    return res.status(400).json({ error: "Invalid jobId" });
  }

  const filePath = path.join(__dirname, "..", "jobs", jobId, "transcript.json");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Transcript not found" });
  }

  res.sendFile(filePath);
});

router.get("/:jobId/audio", (req, res) => {
  const { jobId } = req.params;

  if (!/^\d+$/.test(jobId)) {
    return res.status(400).json({ error: "Invalid jobId" });
  }

  const filePath = path.join(__dirname, "..", "jobs", jobId, "original.mp3");

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Audio not found" });
  }

  res.sendFile(filePath);
});

module.exports = router;
