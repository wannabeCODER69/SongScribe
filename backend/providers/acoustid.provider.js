const querystring = require("querystring");

const API_URL = "https://api.acoustid.org/v2/lookup";

async function identifySong({ fingerprint, duration }) {
  if (!process.env.ACOUSTID_API_KEY) {
    throw new Error("Missing ACOUSTID_API_KEY");
  }

  const body = querystring.stringify({
    client: process.env.ACOUSTID_API_KEY,
    fingerprint,
    duration: Math.round(duration),
    meta: "recordings releases",
    format: "json",
  });

  console.log("\n========== ACOUSTID REQUEST ==========");
  console.log("POST", API_URL);
  console.log("Duration:", Math.round(duration));
  console.log("Fingerprint length:", fingerprint.length);
  console.log("======================================\n");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();

  console.log("\n========== ACOUSTID RESPONSE ==========");
  console.log(JSON.stringify(data, null, 2));
  console.log("======================================\n");

  if (!response.ok) {
    throw new Error(`AcoustID request failed (${response.status})`);
  }

  if (!Array.isArray(data.results) || data.results.length === 0) {
    return {
      found: false,
      score: null,
      recordingId: null,
      title: null,
      artist: null,
      album: null,
      duration: null,
    };
  }

  const best = data.results.reduce((a, b) => (a.score > b.score ? a : b));

  const recording = best.recordings?.[0];

  return {
    found: true,
    score: best.score,
    recordingId: recording?.id ?? null,
    title: recording?.title ?? null,
    artist: recording?.artists?.[0]?.name ?? null,
    album: recording?.releases?.[0]?.title ?? null,
    duration: duration || null,
  };
}

module.exports = {
  identifySong,
};
