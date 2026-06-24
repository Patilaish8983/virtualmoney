import React, { useEffect, useState } from "react";
import { Award, Users, AlertTriangle, CheckCircle, Flame } from "lucide-react";

export default function Leaderboard({ activePersona }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [lbRes, statsRes] = await Promise.all([
          fetch("http://localhost:5000/api/leaderboard"),
          fetch("http://localhost:5000/api/stats")
        ]);

        if (!lbRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch leaderboard/stats from backend.");
        }

        const lbData = await lbRes.json();
        const statsData = await statsRes.json();

        setLeaderboard(lbData);
        setStats(statsData);
      } catch (err) {
        console.error("Error loading backend data:", err);
        setError("Unable to connect to the backend server. Run the backend and database to see global statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p style={{ color: "var(--text-secondary)" }}>Loading global database metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: "30px", border: "1px solid var(--warning)", background: "rgba(245, 158, 11, 0.05)", textAlign: "center" }}>
        <AlertTriangle style={{ color: "var(--warning)", marginBottom: "15px" }} size={32} />
        <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Offline Mode</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", maxWidth: "600px", margin: "0 auto" }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
      
      {/* Aggregate Stats Section */}
      <div className="glass-panel" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Users size={18} style={{ color: "var(--primary)" }} />
          Persona Global Stats
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
          See which characters are most prone to going broke or thriving across all players globally.
        </p>

        {stats.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "center", padding: "20px" }}>No plays registered yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {stats.map((s) => (
              <div key={s.persona} className="glass-panel" style={{ padding: "16px", background: "rgba(255,255,255,0.01)" }}>
                <h4 style={{ fontSize: "1.05rem", color: "#fff", marginBottom: "4px" }}>{s.persona}</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "12px" }}>Total Plays: <strong>{s.total_plays}</strong></p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Avg Score:</span>
                    <span style={{ color: "var(--primary)", fontWeight: "700" }}>{Math.round(s.avg_score)}/100</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Went Broke:</span>
                    <span style={{ color: "var(--danger)", fontWeight: "600" }}>
                      {Math.round((s.broke_count / s.total_plays) * 100)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Survived:</span>
                    <span style={{ color: "var(--warning)", fontWeight: "600" }}>
                      {Math.round((s.survived_count / s.total_plays) * 100)}%
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Thrived:</span>
                    <span style={{ color: "var(--success)", fontWeight: "600" }}>
                      {Math.round((s.thrived_count / s.total_plays) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel" style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Award size={18} style={{ color: "var(--primary)" }} />
          Global Leaderboard
        </h3>
        
        {leaderboard.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", textAlign: "center", padding: "20px" }}>No top scores submitted yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}>
                  <th style={{ padding: "12px 8px" }}>Rank</th>
                  <th style={{ padding: "12px 8px" }}>Player</th>
                  <th style={{ padding: "12px 8px" }}>Character</th>
                  <th style={{ padding: "12px 8px", textAlign: "right" }}>Net Worth</th>
                  <th style={{ padding: "12px 8px", textAlign: "right" }}>IQ Score</th>
                  <th style={{ padding: "12px 8px", textAlign: "center" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", color: "var(--text-primary)" }}>
                    <td style={{ padding: "12px 8px", fontWeight: "600" }}>
                      {idx === 0 ? <Flame size={16} style={{ color: "var(--warning)", display: "inline", marginRight: "4px" }} /> : null}
                      #{idx + 1}
                    </td>
                    <td style={{ padding: "12px 8px", fontWeight: "500" }}>{row.username}</td>
                    <td style={{ padding: "12px 8px", color: "var(--text-secondary)" }}>{row.persona}</td>
                    <td style={{ padding: "12px 8px", textAlign: "right", color: "var(--success)", fontWeight: "600" }}>
                      ${row.net_worth.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "right", fontWeight: "700", color: "var(--primary)" }}>{row.financial_score}</td>
                    <td style={{ padding: "12px 8px", textAlign: "center" }}>
                      <span className={row.status === 'Thrived' ? 'badge-success' : row.status === 'Survived' ? 'badge-warning' : 'badge-danger'} style={{ fontSize: "0.7rem" }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
