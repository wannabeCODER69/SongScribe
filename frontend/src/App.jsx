import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import TranscribePage from "./pages/TranscribePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import SavedPage from "./pages/SavedPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

export default function App() {
  return (
    <div className="app-atmosphere relative flex h-screen w-full overflow-hidden font-sans">
      {/* Design System §3: subtle grid overlay, sits above the gradient, behind content */}
      <div className="grid-overlay" />

      <Sidebar />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden px-8 pb-5">
          <Routes>
            <Route path="/" element={<TranscribePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
