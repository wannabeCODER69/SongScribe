const fs = require("fs").promises;
const path = require("path");

function formatTime(seconds, msSeparator) {
    const totalMs = Math.round(seconds * 1000);
    const hrs = Math.floor(totalMs / 3600000);
    const mins = Math.floor((totalMs % 3600000) / 60000);
    const secs = Math.floor((totalMs % 60000) / 1000);
    const ms = totalMs % 1000;

    const pad = (num, size) => num.toString().padStart(size, "0");

    return `${pad(hrs, 2)}:${pad(mins, 2)}:${pad(secs, 2)}${msSeparator}${pad(ms, 3)}`;
}

function secondsToSRT(seconds) {
    return formatTime(seconds, ",");
}

function secondsToVTT(seconds) {
    return formatTime(seconds, ".");
}

async function generateTXT(transcript, jobFolder) {
    const segments = transcript?.segments || [];
    const content = segments.map(seg => seg.text).join("\n");
    const filePath = path.join(jobFolder, "transcript.txt");
    await fs.writeFile(filePath, content, "utf8");
}

async function generateSRT(transcript, jobFolder) {
    const segments = transcript?.segments || [];
    const blocks = segments.map((seg, idx) => {
        return `${idx + 1}\n${secondsToSRT(seg.start)} --> ${secondsToSRT(seg.end)}\n${seg.text}`;
    });
    const content = blocks.join("\n\n") + (blocks.length > 0 ? "\n" : "");
    const filePath = path.join(jobFolder, "subtitles.srt");
    await fs.writeFile(filePath, content, "utf8");
}

async function generateVTT(transcript, jobFolder) {
    const segments = transcript?.segments || [];
    const blocks = segments.map(seg => {
        return `${secondsToVTT(seg.start)} --> ${secondsToVTT(seg.end)}\n${seg.text}`;
    });
    const content = "WEBVTT\n\n" + blocks.join("\n\n") + (blocks.length > 0 ? "\n" : "");
    const filePath = path.join(jobFolder, "subtitles.vtt");
    await fs.writeFile(filePath, content, "utf8");
}

module.exports = {
    generateTXT,
    generateSRT,
    generateVTT
};
