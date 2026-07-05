const querystring = require("querystring");

const API_URL = "https://api.acoustid.org/v2/lookup";

async function identifySong({ fingerprint, duration }) {
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

    if (!data.results || data.results.length === 0) {
        return null;
    }

    const best = data.results[0];

    if (!best.recordings || best.recordings.length === 0) {
        return null;
    }

    return {
        score: best.score,
        recordingId: best.recordings[0].id,
    };
}

module.exports = {
    identifySong,
};