import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <VideoGrid />
      </div>
    </div>
  );
}

export default App;
