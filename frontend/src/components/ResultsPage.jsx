import React, { useEffect, useState } from "react";
import { Award, RefreshCw, AlertCircle, CheckCircle, ShieldAlert } from "lucide-react";
import Leaderboard from "./Leaderboard";

export default function ResultsPage({ username, persona, results, onRestart }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [viewLeaderboard, setViewLeaderboard] = useState(false);

  useEffect(() => {
    // Automatically submit score to backend
    const submitScore = async () => {
      setSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch("http://localhost:5000/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            persona: persona.name,
            starting_cash: persona.startingCash,
            ending_cash: results.cash,
            net_worth: results.netWorth,
            financial_score: results.score,
            decisions: results.decisions,
            status: results.status
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to connect to backend server");
        }
        setSubmitSuccess(true);
      } catch (err) {
        console.error("Error submitting score:", err);
        setSubmitError("Could not connect to local backend API. Leaderboard scores won't update.");
      } finally {
        setSubmitting(false);
      }
    };

    submitScore();
  }, [username, persona, results]);

  return (
    <div className="results-container animate-fade-in" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: "40px", textAlign: "center", marginBottom: "30px", borderTop: `4px solid ${results.status === 'Thrived' ? 'var(--success)' : results.status === 'Survived' ? 'var(--warning)' : 'var(--danger)'}` }}>
        <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "80px", height: "80px", borderRadius: "50%", background: results.status === 'Thrived' ? 'var(--success-glow)' : results.status === 'Survived' ? 'var(--warning-glow)' : 'var(--danger-glow)', color: results.status === 'Thrived' ? 'var(--success)' : results.status === 'Survived' ? 'var(--warning)' : 'var(--danger)', marginBottom: "20px" }}>
          {results.status === 'Thrived' ? <CheckCircle size={40} /> : results.status === 'Survived' ? <Award size={40} /> : <ShieldAlert size={40} />}
        </div>
        
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
          You {results.status === 'Broke' ? 'Went Broke!' : results.status === 'Thrived' ? 'Thrived Financially!' : 'Survived the Simulation!'}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "25px" }}>
          Here is your financial report card for playing as <strong>{persona.name} ({persona.role})</strong>.
        </p>

        {/* Score grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "800px", margin: "0 auto 30px auto" }}>
          <div className="glass-panel" style={{ padding: "20px", background: "rgba(255,255,255,0.02)" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>FINAL NET WORTH</span>
            <span style={{ fontSize: "1.8rem", fontWeight: "800", color: results.netWorth >= 0 ? "var(--success)" : "var(--danger)" }}>
              ${results.netWorth.toLocaleString()}
            </span>
          </div>

          <div className="glass-panel" style={{ padding: "20px", background: "rgba(255,255,255,0.02)" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>FINANCIAL IQ SCORE</span>
            <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--primary)" }}>
              {results.score}/100
            </span>
          </div>

          <div className="glass-panel" style={{ padding: "20px", background: "rgba(255,255,255,0.02)" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>STATUS</span>
            <span className={results.status === 'Thrived' ? 'badge-success' : results.status === 'Survived' ? 'badge-warning' : 'badge-danger'} style={{ fontSize: "1rem", marginTop: "8px", display: "inline-block" }}>
              {results.status}
            </span>
          </div>
        </div>

        {/* Backend connectivity feedback */}
        <div style={{ fontSize: "0.85rem" }}>
          {submitting && <span style={{ color: "var(--text-muted)" }}>Saving results to database...</span>}
          {submitSuccess && <span style={{ color: "var(--success)" }}>✓ Score posted to global leaderboard.</span>}
          {submitError && <span style={{ color: "var(--warning)" }}>⚠️ {submitError}</span>}
        </div>
      </div>

      {/* Main Grid: Audit vs Leaderboard */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px", marginBottom: "40px" }}>
        
        {/* Toggle between Audit and Leaderboard */}
        <div style={{ display: "flex", gap: "15px", borderBottom: "1px solid var(--border)", paddingBottom: "15px" }}>
          <button
            onClick={() => setViewLeaderboard(false)}
            className="btn-secondary"
            style={{ borderColor: !viewLeaderboard ? "var(--primary)" : "var(--border)", color: !viewLeaderboard ? "#fff" : "var(--text-secondary)" }}
          >
            Audit Report Card
          </button>
          <button
            onClick={() => setViewLeaderboard(true)}
            className="btn-secondary"
            style={{ borderColor: viewLeaderboard ? "var(--primary)" : "var(--border)", color: viewLeaderboard ? "#fff" : "var(--text-secondary)" }}
          >
            Show Leaderboard & Stats
          </button>
        </div>

        {!viewLeaderboard ? (
          /* Scenario Decisions Audit */
          <div className="glass-panel" style={{ padding: "30px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "20px" }}>Decision Audit Logs</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {results.decisions.map((dec, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: "20px",
                    borderLeft: `4px solid ${dec.resultType === 'smart' ? 'var(--success)' : dec.resultType === 'mediocre' ? 'var(--warning)' : 'var(--danger)'}`,
                    background: "rgba(255,255,255,0.01)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
                    <h4 style={{ fontSize: "1.1rem" }}>{dec.scenarioTitle}</h4>
                    <span className={dec.resultType === 'smart' ? 'badge-success' : dec.resultType === 'mediocre' ? 'badge-warning' : 'badge-danger'} style={{ fontSize: "0.7rem", textTransform: "uppercase" }}>
                      {dec.resultType} choice
                    </span>
                  </div>
                  
                  <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "8px" }}>
                    Your choice: <span style={{ color: "var(--text-secondary)" }}>{dec.choiceText}</span>
                  </p>

                  <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", lineHeight: "1.5", paddingTop: "8px", borderTop: "1px dashed var(--border)" }}>
                    {dec.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Leaderboards & Aggregate Stats Component */
          <Leaderboard activePersona={persona.name} />
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        <button onClick={onRestart} className="btn-primary">
          <RefreshCw size={18} />
          Play Again / Change Character
        </button>
      </div>

    </div>
  );
}
