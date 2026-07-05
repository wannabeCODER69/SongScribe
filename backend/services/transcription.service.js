const { spawn } = require("child_process");
const path = require("path");

async function transcribeAudio(audioPath) {
    return new Promise((resolve, reject) => {

        const script = path.join(
            __dirname,
            "../../ai/transcribe.py"
        );

        const python =
            process.env.PYTHON_PATH ||
            "python";

        const processPy = spawn(
            python,
            [
                script,
                audioPath
            ],
            {
                windowsHide: true
            }
        );

        let stdout = "";
        let stderr = "";

        processPy.stdout.on("data", data => {
            stdout += data.toString();
        });

        processPy.stderr.on("data", data => {
            stderr += data.toString();
        });

        processPy.on("error", err => {
            reject(err);
        });

        processPy.on("close", code => {

            if (code !== 0) {
                return reject(
                    new Error(stderr)
                );
            }

            try {

                const result = JSON.parse(stdout);

                if (!result.success) {
                    return reject(
                        new Error(
                            result.error ||
                            "Whisper transcription failed."
                        )
                    );
                }

                resolve(result);

            } catch (err) {

                reject(
                    new Error(
                        "Unable to parse Whisper output.\n\n" +
                        stdout
                    )
                );

            }

        });

    });
}

module.exports = {
    transcribeAudio
};