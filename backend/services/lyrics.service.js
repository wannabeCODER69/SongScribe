const lrclibProvider = require("../providers/lrclib.provider");

// Future providers can be added here
const PROVIDERS = [
    lrclibProvider
];

async function getSynchronizedLyrics(match) {
    if (!match || !match.found) {
        return null;
    }

    const { title, artist, album, duration } = match;
    if (!title || !artist) {
        return null;
    }

    for (const provider of PROVIDERS) {
        try {
            if (typeof provider.getSyncedLyrics === "function") {
                const syncedLyrics = await provider.getSyncedLyrics({
                    title,
                    artist,
                    album,
                    duration
                });
                if (syncedLyrics) {
                    return syncedLyrics;
                }
            }
        } catch (err) {
            console.error("[LYRICS SERVICE] Provider error:", err);
        }
    }

    return null;
}

module.exports = {
    getSynchronizedLyrics
};
