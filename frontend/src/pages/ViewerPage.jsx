import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function ViewerPage() {
  const { jobId } = useParams();

  const audioRef = useRef(null);
  const activeLineRef = useRef(null);

  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    async function loadTranscript() {
      try {
        const response = await fetch(`http://localhost:5000/viewer/${jobId}/transcript`);

        if (!response.ok) {
          throw new Error("Failed to load transcript");
        }

        const data = await response.json();

        setTranscript(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTranscript();
  }, [jobId]);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex]);

  const handleSeek = (time) => {
    if (!audioRef.current) return;

    const wasPlaying = !audioRef.current.paused;

    audioRef.current.currentTime = time;

    if (wasPlaying) {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current || !transcript) return;

    const currentTime = audioRef.current.currentTime;

    const index = transcript.segments.findIndex(
      (segment) => currentTime >= segment.start && currentTime < segment.end
    );

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>SongScribe Viewer</h1>
        <p>Loading transcript...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1>SongScribe Viewer</h1>
        <p>Error: {error}</p>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
      }}
    >
      <h1>SongScribe Viewer</h1>

      <audio
        ref={audioRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        src={`http://localhost:5000/viewer/${jobId}/audio`}
        style={{
          width: "100%",
          marginBottom: "30px",
        }}
      />

      <div
        style={{
          border: "1px solid #444",
          borderRadius: "8px",
          maxHeight: "500px",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {transcript.segments.map((segment, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={`${segment.start}-${segment.end}`}
              ref={isActive ? activeLineRef : null}
              onClick={() => handleSeek(segment.start)}
              style={{
                display: "flex",
                gap: "20px",
                padding: "10px 12px",
                borderBottom: "1px solid #222",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderRadius: "6px",
                backgroundColor: isActive ? "#2d5eff33" : "transparent",
              }}
            >
              <span
                style={{
                  color: isActive ? "#66a3ff" : "#888",
                  minWidth: "55px",
                  fontFamily: "monospace",
                  fontWeight: isActive ? "bold" : "normal",
                  flexShrink: 0,
                }}
              >
                {formatTime(segment.start)}
              </span>

              <span
                style={{
                  fontWeight: isActive ? "600" : "400",
                }}
              >
                {segment.text}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default ViewerPage;
