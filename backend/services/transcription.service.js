const { spawn } = require("child_process");
const path = require("path");

async function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const script = path.join(__dirname, "../../ai/transcribe.py");

    const python = process.env.PYTHON_PATH || "python";

    console.log("[NODE] Python executable:", python);
    console.log("[NODE] Python script:", script);
    console.log("[NODE] Audio path:", audioPath);

    const processPy = spawn(python, [script, audioPath], {
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    processPy.stdout.on("data", (data) => {
      const text = data.toString();
      stdout += text;
      console.log("[PY STDOUT]", text.trim());
    });

    processPy.stderr.on("data", (data) => {
      const text = data.toString();
      stderr += text;
      console.error("[PY STDERR]", text.trim());
    });

    processPy.on("error", (err) => {
      console.error("[NODE] Failed to start Python:", err);
      reject(err);
    });

    processPy.on("close", (code) => {
      console.log("[NODE] Python exited with code:", code);

      if (code !== 0) {
        return reject(new Error(stderr || `Python exited with code ${code}`));
      }

      try {
        const result = JSON.parse(stdout);

        if (!result.success) {
          return reject(new Error(result.error || "Whisper transcription failed."));
        }

        resolve(result);
      } catch (err) {
        reject(
          new Error(
            [
              "Unable to parse Whisper output.",
              "",
              err.message,
              "",
              "----- STDOUT -----",
              stdout,
              "",
              "----- STDERR -----",
              stderr,
            ].join("\n")
          )
        );
      }
    });
  });
}

module.exports = {
  transcribeAudio,
};
