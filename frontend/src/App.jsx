import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import GameScreen from "./components/GameScreen";
import ResultsPage from "./components/ResultsPage";
import { Landmark } from "lucide-react";

function App() {
  const [screen, setScreen] = useState("landing"); // 'landing' | 'game' | 'results'
  const [username, setUsername] = useState("");
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [gameResults, setGameResults] = useState(null);

  const handleStartGame = () => {
    if (username && selectedPersona) {
      setScreen("game");
    }
  };

  const handleGameFinished = (results) => {
    setGameResults(results);
    setScreen("results");
  };

  const handleRestart = () => {
    setSelectedPersona(null);
    setGameResults(null);
    setScreen("landing");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Top Navbar */}
      <nav style={{ 
        borderBottom: "1px solid var(--border)", 
        padding: "16px 24px", 
        background: "rgba(7, 10, 19, 0.8)", 
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div 
          onClick={handleRestart}
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <Landmark size={22} style={{ color: "var(--primary)" }} />
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: "800", fontSize: "1.2rem", tracking: "-0.03em" }}>
            Broke<span style={{ color: "var(--primary)" }}>Sim</span>
          </span>
        </div>

        {screen === "game" && selectedPersona && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <span>Playing as: <strong>{selectedPersona.name}</strong></span>
            <span>|</span>
            <span>Player: <strong>{username}</strong></span>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "20px 0" }}>
        {screen === "landing" && (
          <LandingPage
            username={username}
            setUsername={setUsername}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            onStartGame={handleStartGame}
          />
        )}

        {screen === "game" && selectedPersona && (
          <GameScreen
            persona={selectedPersona}
            onGameFinished={handleGameFinished}
          />
        )}

        {screen === "results" && selectedPersona && gameResults && (
          <ResultsPage
            username={username}
            persona={selectedPersona}
            results={gameResults}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: "1px solid var(--border)", 
        padding: "20px 24px", 
        textAlign: "center", 
        fontSize: "0.8rem", 
        color: "var(--text-muted)",
        background: "rgba(7, 10, 19, 0.4)"
      }}>
        © 2026 BrokeSim. An interactive full-stack application built for real-world financial literacy.
      </footer>
    </div>
  );
}

export default App;
