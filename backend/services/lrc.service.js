function parseLRC(lrcContent) {
    if (!lrcContent) {
        return {
            success: true,
            language: null,
            confidence: 1.0,
            segments: []
        };
    }

    const lines = lrcContent.split(/\r?\n/);
    const segments = [];
    const tagRegex = /\[(\d{2,3}):(\d{2})(?:\.(\d{2,3}))?\]/g;

    for (const line of lines) {
        tagRegex.lastIndex = 0;
        let match;
        const startTimes = [];
        while ((match = tagRegex.exec(line)) !== null) {
            const mins = parseInt(match[1], 10);
            const secs = parseInt(match[2], 10);
            const msStr = match[3] || "0";
            const ms = parseFloat("0." + msStr);
            const start = mins * 60 + secs + ms;
            startTimes.push(start);
        }

        if (startTimes.length > 0) {
            const text = line.replace(/\[.*?\]/g, "").trim();
            if (text) {
                for (const start of startTimes) {
                    segments.push({
                        start,
                        text
                    });
                }
            }
        }
    }

    // Sort segments by start time
    segments.sort((a, b) => a.start - b.start);

    // Calculate end times
    for (let i = 0; i < segments.length; i++) {
        if (i < segments.length - 1) {
            segments[i].end = segments[i + 1].start;
        } else {
            segments[i].end = segments[i].start + 3.0; // Fallback
        }
    }

    return {
        success: true,
        language: null,
        confidence: 1.0,
        segments
    };
}

module.exports = {
    parseLRC
};
