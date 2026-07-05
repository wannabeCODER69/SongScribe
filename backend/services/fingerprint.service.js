const { spawn } = require("child_process");
const path = require("path");

const FP_CALC =
    process.env.FP_CALC_PATH ||
    "fpcalc";

async function generateFingerprint(audioPath) {
    return new Promise((resolve, reject) => {
        const absoluteAudioPath = path.resolve(audioPath);

        const fpcalc = spawn(
            FP_CALC,
            [
                "-json",
                absoluteAudioPath
            ],
            {
                windowsHide: true
            }
        );

        let stdout = "";
        let stderr = "";

        fpcalc.stdout.on("data", (data) => {
            stdout += data.toString();
        });

        fpcalc.stderr.on("data", (data) => {
            stderr += data.toString();
        });

        fpcalc.on("error", (err) => {
            reject(
                new Error(
                    `Failed to start fpcalc.\n` +
                    `Executable: ${FP_CALC}\n\n` +
                    err.message
                )
            );
        });

        fpcalc.on("close", (code) => {
            if (code !== 0) {
                return reject(
                    new Error(
                        `fpcalc exited with code ${code}\n\n${stderr}`
                    )
                );
            }

            try {
                const result = JSON.parse(stdout);

                resolve({
                    duration: result.duration,
                    fingerprint: result.fingerprint
                });
            } catch (err) {
                reject(
                    new Error(
                        `Unable to parse fpcalc output.\n\n${stdout}`
                    )
                );
            }
        });
    });
}

module.exports = {
    generateFingerprint
};