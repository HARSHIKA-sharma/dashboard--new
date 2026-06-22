// src/App.jsx
import React, { useState } from "react";
import UppclHeader from "./components/UppclHeader";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import Meetings from "./components/Meetings";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <UppclHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 w-full bg-[#f4f7f6]">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "projects" && <Projects />}
          {activeTab === "meetings" && <Meetings />}
        </main>
      </div>
    </AuthProvider>
  );
}
