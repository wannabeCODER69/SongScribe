const { identifySong } = require("../providers/acoustid.provider");

async function identifyFingerprint(fingerprint) {
  const acoustid = await identifySong(fingerprint);

  if (acoustid.found) {
    return {
      provider: "acoustid",
      ...acoustid,
    };
  }

  return {
    provider: "fallback",
    found: false,
  };
}

module.exports = {
  identifyFingerprint,
};
