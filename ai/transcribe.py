import json
import os
import sys
import traceback

from faster_whisper import WhisperModel

MODEL_SIZE = "small"


def log(message):
    print(message, file=sys.stderr, flush=True)


def main():
    try:
        log("[PY] Starting transcribe.py")

        if len(sys.argv) != 2:
            print(json.dumps({
                "success": False,
                "error": "Missing audio file."
            }))
            return

        audio_path = sys.argv[1]
        log(f"[PY] Audio: {audio_path}")

        if not os.path.exists(audio_path):
            print(json.dumps({
                "success": False,
                "error": "Audio file not found."
            }))
            return

        log("[PY] Loading Whisper model...")

        model = WhisperModel(
            MODEL_SIZE,
            device="cpu",
            compute_type="int8"
        )

        log("[PY] Whisper model loaded.")

        log("[PY] Starting transcription...")

        segments, info = model.transcribe(
            audio_path,
            beam_size=5,
            vad_filter=False
        )

        log("[PY] Transcription finished.")
        log(f"[PY] Detected language: {info.language}")

        result = {
            "success": True,
            "language": info.language,
            "confidence": round(info.language_probability, 3),
            "segments": []
        }

        log("[PY] Collecting segments...")

        for segment in segments:
            result["segments"].append({
                "start": round(segment.start, 2),
                "end": round(segment.end, 2),
                "text": segment.text.strip()
            })

        log(f"[PY] Collected {len(result['segments'])} segments.")

        output_path = os.path.join(
            os.path.dirname(audio_path),
            "transcript.json"
        )

        log(f"[PY] Writing transcript to {output_path}")

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(
                result,
                f,
                ensure_ascii=False,
                indent=4
            )

        log("[PY] Done.")

        print(json.dumps(result, ensure_ascii=False))

    except Exception as e:
        log("[PY] EXCEPTION")
        traceback.print_exc(file=sys.stderr)

        print(json.dumps({
            "success": False,
            "error": str(e)
        }))


if __name__ == "__main__":
    main()
