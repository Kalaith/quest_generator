import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import QuestGeneratorPage from "./pages/QuestGeneratorPage";
import QuestLibraryPage from "./pages/QuestLibraryPage";
import QuestHistoryPage from "./pages/QuestHistoryPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SharedLayout>
        <Routes>
          <Route path="/" element={<QuestGeneratorPage />} />
          <Route path="/library" element={<QuestLibraryPage />} />
          <Route path="/history" element={<QuestHistoryPage />} />
        </Routes>
      </SharedLayout>
    </BrowserRouter>
  );
};

export default App;
