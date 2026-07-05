import json
import os
import sys

from faster_whisper import WhisperModel

MODEL_SIZE = "small"


def main():

    if len(sys.argv) != 2:
        print(json.dumps({
            "success": False,
            "error": "Missing audio file."
        }))
        return

    audio_path = sys.argv[1]

    if not os.path.exists(audio_path):
        print(json.dumps({
            "success": False,
            "error": "Audio file not found."
        }))
        return

    model = WhisperModel(
        MODEL_SIZE,
        device="cpu",
        compute_type="int8"
    )

    segments, info = model.transcribe(
        audio_path,
        beam_size=5,
        vad_filter=True
    )

    result = {
        "success": True,
        "language": info.language,
        "confidence": round(info.language_probability, 3),
        "segments": []
    }

    for segment in segments:
        result["segments"].append({
            "start": round(segment.start, 2),
            "end": round(segment.end, 2),
            "text": segment.text.strip()
        })

    output_path = os.path.join(
        os.path.dirname(audio_path),
        "transcript.json"
    )

    with open(
        output_path,
        "w",
        encoding="utf-8"
    ) as f:
        json.dump(
            result,
            f,
            ensure_ascii=False,
            indent=4
        )

    print(json.dumps(result, ensure_ascii=False))


if __name__ == "__main__":
    main()