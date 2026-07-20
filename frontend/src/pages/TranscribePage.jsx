import UploadDropzone from "../components/UploadDropzone.jsx";
import ProcessingCard from "../components/ProcessingCard.jsx";
import TranscribedText from "../components/TranscribedText.jsx";
import SongInfo from "../components/SongInfo.jsx";
import DownloadBar from "../components/DownloadBar.jsx";

export default function TranscribePage() {
  return (
    <div className="flex h-full min-h-0 flex-col pt-3">
      {/* Fixed-height block: hero dropzone + processing status, 16px apart */}
      <div className="shrink-0">
        <UploadDropzone />
        <div className="mt-4">
          <ProcessingCard />
        </div>
      </div>

      {/* Fills remaining vertical space; the transcript panel scrolls internally, this row never does */}
      <div className="mt-5 flex min-h-0 flex-1 items-stretch gap-6">
        <SongInfo />
        <TranscribedText />
      </div>

      <DownloadBar />
    </div>
  );
}
