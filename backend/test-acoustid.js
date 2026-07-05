require("dotenv").config();

const fs = require("fs");

async function main() {
    const fingerprint = fs.readFileSync("fingerprint.txt", "utf8").trim();

    const params = new URLSearchParams({
        client: process.env.ACOUSTID_API_KEY,
        duration: "263",
        fingerprint,
        meta: "recordings releases releasegroups tracks sources",
        format: "json",
    });

    const url = "https://api.acoustid.org/v2/lookup?" + params;

    const res = await fetch(url);

    console.log("HTTP:", res.status);
    console.log(await res.text());
}

main().catch(console.error);