const USER_AGENT = "SongScribe/1.0.0 (https://github.com/user/songscribe)";

async function getSyncedLyrics({ title, artist, album, duration }) {
    // 1. Try exact lookup via /api/get if we have duration
    if (title && artist && duration) {
        try {
            const params = new URLSearchParams({
                artist_name: artist,
                track_name: title,
                album_name: album || "",
                duration: Math.round(duration).toString()
            });
            const url = `https://lrclib.net/api/get?${params.toString()}`;
            const res = await fetch(url, {
                headers: { "User-Agent": USER_AGENT }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.syncedLyrics) {
                    return data.syncedLyrics;
                }
            }
        } catch (err) {
            console.error("[LRCLIB GET ERROR]", err);
        }
    }

    // 2. Fall back to search if exact lookup did not return synced lyrics
    if (title && artist) {
        try {
            const query = `${artist} - ${title}`;
            const url = `https://lrclib.net/api/search?q=${encodeURIComponent(query)}`;
            const res = await fetch(url, {
                headers: { "User-Agent": USER_AGENT }
            });
            if (res.ok) {
                const results = await res.json();
                if (Array.isArray(results)) {
                    for (const track of results) {
                        if (track.syncedLyrics) {
                            return track.syncedLyrics;
                        }
                    }
                }
            }
        } catch (err) {
            console.error("[LRCLIB SEARCH ERROR]", err);
        }
    }

    return null;
}

module.exports = {
    getSyncedLyrics,
};
