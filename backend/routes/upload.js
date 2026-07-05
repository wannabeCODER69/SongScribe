const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { extractAudio } = require("../services/ffmpeg.service");

const router = express.Router();

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const jobId = Date.now().toString();

        const jobFolder = path.join("jobs", jobId);

        fs.mkdirSync(jobFolder, {
            recursive: true
        });

        req.jobId = jobId;
        req.jobFolder = jobFolder;

        cb(null, jobFolder);

    },

    filename: (req, file, cb) => {

        cb(
            null,
            "original" + path.extname(file.originalname)
        );

    }

});

const upload = multer({
    storage
});

router.post("/", upload.single("file"), async (req, res) => {

    try {

        await extractAudio(
            req.jobFolder,
            req.file.filename
        );

        res.json({

            success: true,

            jobId: req.jobId,

            message: "Audio extracted successfully."

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

module.exports = router;