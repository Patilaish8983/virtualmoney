import React from "react";
import { User, Play, Landmark, ShieldAlert, Award } from "lucide-react";
import { personas } from "../data/personas";

export default function LandingPage({ username, setUsername, selectedPersona, setSelectedPersona, onStartGame }) {
  return (
    <div className="landing-container animate-fade-in" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      {/* Hero Header */}
      <header style={{ textAlignment: "center", textAlign: "center", marginBottom: "50px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(139, 92, 246, 0.1)", padding: "8px 16px", borderRadius: "30px", border: "1px solid rgba(139, 92, 246, 0.2)", marginBottom: "20px" }}>
          <Landmark size={16} className="text-primary" style={{ color: "var(--primary)" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--primary)", letterSpacing: "0.05em" }}>THE FINANCIAL LITERACY SIMULATOR</span>
        </div>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "15px", background: "linear-gradient(to right, #fff, #9ca3af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          BrokeSim: Learn by Losing
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: "1.6" }}>
          Lose virtual cash here, so you don't lose real cash in the real world. Test your financial IQ across common traps: bad policies, scams, lifestyle inflation, and speculative FOMO.
        </p>
      </header>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", marginBottom: "40px" }}>
        
        {/* Step 1: User Profile */}
        <div className="glass-panel" style={{ padding: "30px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <User className="text-primary" style={{ color: "var(--primary)" }} />
            1. Enter Your Details
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px" }}>
            <label style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: "500" }}>Player Name / Username</label>
            <input
              type="text"
              placeholder="e.g., JaneDoe"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
              className="input-field"
              maxLength={20}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Only alphanumeric characters. This is used for the leaderboard.</span>
          </div>
        </div>

        {/* Step 2: Choose Persona */}
        <div className="glass-panel" style={{ padding: "30px" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Award className="text-primary" style={{ color: "var(--primary)" }} />
            2. Select Your Character Persona
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "25px", fontSize: "0.95rem" }}>
            Each character faces unique financial challenges, traps, and decision points. Try playing all of them to master financial literacy.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {personas.map((p) => {
              const isSelected = selectedPersona?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPersona(p)}
                  className="glass-panel"
                  style={{
                    padding: "24px",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                    boxShadow: isSelected ? "0 0 15px var(--primary-glow)" : "none",
                    transform: isSelected ? "translateY(-4px)" : "none",
                    position: "relative"
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{p.avatar}</div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "4px" }}>{p.name}</h3>
                  <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "600", marginBottom: "12px", textTransform: "uppercase" }}>
                    {p.role} (Age {p.age})
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "15px" }}>
                    {p.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", borderTop: "1px solid var(--border)", paddingTop: "12px", color: "var(--text-muted)" }}>
                    <span>Starting Cash: <strong>${p.startingCash.toLocaleString()}</strong></span>
                    <span>Monthly: <strong>${p.monthlyIncome.toLocaleString()}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={onStartGame}
          className="btn-primary"
          disabled={!username || !selectedPersona}
          style={{
            padding: "16px 40px",
            fontSize: "1.2rem",
            opacity: (!username || !selectedPersona) ? 0.5 : 1,
            cursor: (!username || !selectedPersona) ? "not-allowed" : "pointer"
          }}
        >
          <Play size={20} fill="#fff" />
          Start Simulation
        </button>
        {(!username || !selectedPersona) && (
          <p style={{ color: "var(--danger)", fontSize: "0.9rem", marginTop: "12px", fontWeight: "500" }}>
            {!username ? "Please enter a username" : "Please select a character persona"} to begin.
          </p>
        )}
      </div>
    </div>
  );
}
