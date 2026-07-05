import json
import os
import sys

from faster_whisper import WhisperModel

MODEL_SIZE = "small"


def main():
    if len(sys.argv) != 2:
        print("Usage:")
        print("python transcribe.py <audio-file>")
        return

    audio_path = sys.argv[1]

    if not os.path.exists(audio_path):
        print(f"File not found: {audio_path}")
        return

    print("Loading Whisper model...")

    model = WhisperModel(
        MODEL_SIZE,
        device="cpu",
        compute_type="int8"
    )

    print("Transcribing...\n")

    segments, info = model.transcribe(
        audio_path,
        beam_size=5,
        vad_filter=True
    )

    transcript = {
        "language": info.language,
        "language_probability": round(info.language_probability, 3),
        "segments": []
    }

    print("-" * 70)

    for segment in segments:
        print(
            f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}"
        )

        transcript["segments"].append({
            "start": round(segment.start, 2),
            "end": round(segment.end, 2),
            "text": segment.text.strip()
        })

    print("-" * 70)

    print(f"\nLanguage: {info.language}")
    print(f"Confidence: {info.language_probability:.3f}")

    output_path = os.path.join(
        os.path.dirname(audio_path),
        "transcript.json"
    )

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(
            transcript,
            f,
            ensure_ascii=False,
            indent=4
        )

    print(f"\nTranscript saved to:\n{output_path}")

    print("\nDone!")


if __name__ == "__main__":
    main()