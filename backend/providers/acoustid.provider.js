const querystring = require("querystring");

const API_URL = "https://api.acoustid.org/v2/lookup";

async function identifySong({ fingerprint, duration }) {
    if (!process.env.ACOUSTID_API_KEY) {
        throw new Error(
            "Missing ACOUSTID_API_KEY in environment variables."
        );
    }

    const url =
        API_URL +
        "?" +
        querystring.stringify({
            client: process.env.ACOUSTID_API_KEY,
            meta: "recordings",
            duration,
            fingerprint,
        });

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `AcoustID request failed (${response.status})`
        );
    }

    const data = await response.json();

    if (data.status !== "ok") {
        throw new Error(
            data.error?.message || "AcoustID lookup failed."
        );
    }

    if (!Array.isArray(data.results) || data.results.length === 0) {
        return null;
    }

    const best = data.results.reduce((highest, current) =>
        current.score > highest.score ? current : highest
    );

    if (
        !Array.isArray(best.recordings) ||
        best.recordings.length === 0
    ) {
        return null;
    }

    const recording = best.recordings[0];

    return {
        score: best.score,
        recordingId: recording.id,
        title: recording.title || null,
    };
}

module.exports = {
    identifySong,
};