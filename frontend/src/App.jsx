import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ViewerPage from "./pages/ViewerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viewer/:jobId" element={<ViewerPage />} />
    </Routes>
  );
}

export default App;
