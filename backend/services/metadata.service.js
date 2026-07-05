const { identifySong } = require("../providers/acoustid.provider");

async function identifyFingerprint(fingerprint) {
    return identifySong(fingerprint);
}

module.exports = {
    identifyFingerprint,
};