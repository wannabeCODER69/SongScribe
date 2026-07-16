const express = require("express");

const router = express.Router();

const uploadRoutes = require("./upload");
const downloadRoutes = require("./download");
const viewerRoutes = require("./viewer");

// Home
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to SongScribe!",
  });
});

// About
router.get("/about", (req, res) => {
  res.json({
    app: "SongScribe",
    version: "1.0",
  });
});

// Health
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

// Upload routes
router.use("/upload", uploadRoutes);

// Download routes
router.use("/download", downloadRoutes);

// Viewer routes
router.use("/viewer", viewerRoutes);

module.exports = router;
