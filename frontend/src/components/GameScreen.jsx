import React, { useState } from "react";
import { TrendingUp, AlertTriangle, ShieldCheck, Wallet, ShieldAlert, Award, Sparkles } from "lucide-react";

export default function GameScreen({ persona, onGameFinished }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [cash, setCash] = useState(persona.startingCash);
  const [investment, setInvestment] = useState(0);
  const [debt, setDebt] = useState(0);
  const [flags, setFlags] = useState({}); // Stores key triggers (e.g. hasHealthInsurance: false)
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [eventsLog, setEventsLog] = useState([
    { text: `Game started as ${persona.name}. Starting balance: $${persona.startingCash}`, type: "info" }
  ]);
  
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [triggeredEvent, setTriggeredEvent] = useState(null);

  const activeScenario = persona.scenarios[scenarioIndex];

  const handleSelectOption = (idx) => {
    if (feedbackMode) return;
    setSelectedOption(idx);
  };

  const handleConfirmOption = () => {
    if (selectedOption === null || feedbackMode) return;

    const choice = activeScenario.options[selectedOption];
    
    // Apply financial impacts
    const cashImpact = choice.impact.cash || 0;
    const invImpact = choice.impact.investment || 0;
    const debtImpact = choice.impact.debt || 0;

    let newCash = cash + cashImpact;
    let newInv = investment + invImpact;
    let newDebt = debt + debtImpact;

    // Apply specific flag state modifications if any
    const updatedFlags = { ...flags };
    if (choice.impact.hasHealthInsurance !== undefined) updatedFlags.hasHealthInsurance = choice.impact.hasHealthInsurance;
    if (choice.impact.hasTermInsurance !== undefined) updatedFlags.hasTermInsurance = choice.impact.hasTermInsurance;
    if (choice.impact.hasSeniorHealthInsurance !== undefined) updatedFlags.hasSeniorHealthInsurance = choice.impact.hasSeniorHealthInsurance;
    if (choice.impact.hasEmergencyFund !== undefined) updatedFlags.hasEmergencyFund = choice.impact.hasEmergencyFund;
    if (choice.impact.hasInsuranceTrap !== undefined) updatedFlags.hasInsuranceTrap = choice.impact.hasInsuranceTrap;
    
    setFlags(updatedFlags);
    setCash(newCash);
    setInvestment(newInv);
    setDebt(newDebt);

    // Save decision
    const savedDecision = {
      scenarioTitle: activeScenario.title,
      choiceText: choice.text,
      resultType: choice.resultType, // 'smart', 'fumble', 'mediocre'
      explanation: choice.explanation
    };
    const newHistory = [...decisionHistory, savedDecision];
    setDecisionHistory(newHistory);

    // Log the transaction
    const transactionLogs = [];
    if (cashImpact !== 0) {
      transactionLogs.push({
        text: `Transaction: ${cashImpact > 0 ? "+" : ""}$${cashImpact.toLocaleString()} cash`,
        type: cashImpact > 0 ? "success" : "danger"
      });
    }
    if (invImpact !== 0) {
      transactionLogs.push({
        text: `Investments: ${invImpact > 0 ? "+" : ""}$${invImpact.toLocaleString()}`,
        type: "info"
      });
    }
    if (debtImpact !== 0) {
      transactionLogs.push({
        text: `Debt: ${debtImpact > 0 ? "+" : ""}$${debtImpact.toLocaleString()}`,
        type: debtImpact > 0 ? "warning" : "success"
      });
    }
    setEventsLog(prev => [...prev, ...transactionLogs]);

    // Check for triggered conditional events (shock scenarios)
    let eventHappened = null;
    if (activeScenario.triggerEvent) {
      const { conditionField, conditionValue, eventName, eventText, penalty } = activeScenario.triggerEvent;
      // If the user's flag matches the fail condition, the event strikes!
      if (updatedFlags[conditionField] === conditionValue) {
        eventHappened = { eventName, eventText, penalty };
        
        const pCash = penalty.cash || 0;
        const pDebt = penalty.debt || 0;
        
        newCash = newCash + pCash;
        newDebt = newDebt + pDebt;

        setCash(newCash);
        setDebt(newDebt);

        setEventsLog(prev => [
          ...prev,
          { text: `⚠️ SHOCK EVENT: ${eventName} occurred!`, type: "danger" },
          { text: `Financial hit: $${pCash.toLocaleString()} cash`, type: "danger" }
        ]);
      }
    }

    setTriggeredEvent(eventHappened);
    setFeedbackMode(true);
  };

  const handleNextStep = () => {
    setFeedbackMode(false);
    setSelectedOption(null);
    setTriggeredEvent(null);

    const nextIndex = scenarioIndex + 1;
    if (nextIndex < persona.scenarios.length) {
      setScenarioIndex(nextIndex);
    } else {
      // Calculate final score
      // Score starts at 100, drops for each fumble choice (-25), mediocre choice (-10), or if they went broke
      let calculatedScore = 100;
      decisionHistory.forEach((d) => {
        if (d.resultType === "fumble") calculatedScore -= 20;
        if (d.resultType === "mediocre") calculatedScore -= 8;
      });

      const netWorth = cash + investment - debt;
      if (netWorth <= 0) {
        calculatedScore = Math.max(10, calculatedScore - 30);
      }

      calculatedScore = Math.max(10, Math.min(100, calculatedScore));

      // Determine final status
      let finalStatus = "Survived";
      if (netWorth <= 0) {
        finalStatus = "Broke";
      } else if (netWorth > (persona.startingCash * 1.1) && calculatedScore >= 80) {
        finalStatus = "Thrived";
      }

      onGameFinished({
        cash,
        investment,
        debt,
        netWorth,
        score: calculatedScore,
        status: finalStatus,
        decisions: decisionHistory
      });
    }
  };

  const netWorth = cash + investment - debt;

  return (
    <div className="game-container animate-fade-in" style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
      
      {/* Header: Persona Identity */}
      <div className="glass-panel" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "2.5rem" }}>{persona.avatar}</span>
          <div>
            <h2 style={{ fontSize: "1.3rem" }}>{persona.name}</h2>
            <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "600", textTransform: "uppercase" }}>
              {persona.role} • Age {persona.age}
            </div>
          </div>
        </div>

        {/* Mini Ledger */}
        <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>CURRENT CASH</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "700", color: cash >= 0 ? "var(--text-primary)" : "var(--danger)" }}>
              ${cash.toLocaleString()}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>INVESTMENTS</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--success)" }}>
              ${investment.toLocaleString()}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>DEBTS / LIABILITIES</span>
            <span style={{ fontSize: "1.1rem", fontWeight: "700", color: debt > 0 ? "var(--warning)" : "var(--text-muted)" }}>
              ${debt.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Dashboard & Scenarios */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "25px", alignItems: "start" }}>
        
        {/* Left Side: Active Scenario Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Progress Indicator */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <span>Scenario {scenarioIndex + 1} of {persona.scenarios.length}</span>
            <div style={{ width: "200px", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ width: `${((scenarioIndex + 1) / persona.scenarios.length) * 100}%`, height: "100%", background: "var(--primary)", transition: "var(--transition)" }} />
            </div>
          </div>

          {!feedbackMode ? (
            /* Choice Phase Card */
            <div className="glass-panel" style={{ padding: "35px", borderTop: "4px solid var(--primary)" }}>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Sparkles size={20} style={{ color: "var(--primary)" }} />
                {activeScenario.title}
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "30px" }}>
                {activeScenario.story}
              </p>

              {/* Options Grid */}
              <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "35px" }}>
                {activeScenario.options.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className="glass-panel"
                    style={{
                      padding: "20px",
                      cursor: "pointer",
                      transition: "var(--transition)",
                      border: selectedOption === i ? "1px solid var(--primary)" : "1px solid var(--border)",
                      background: selectedOption === i ? "rgba(139, 92, 246, 0.05)" : "rgba(15, 19, 34, 0.4)",
                      transform: selectedOption === i ? "translateX(6px)" : "none"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>Option {String.fromCharCode(65 + i)}</span>
                      <span className={opt.risk === "High" ? "badge-danger" : opt.risk === "Moderate" ? "badge-warning" : "badge-success"}>
                        {opt.risk} Risk
                      </span>
                    </div>
                    <p style={{ fontSize: "0.95rem", color: selectedOption === i ? "#fff" : "var(--text-secondary)" }}>{opt.text}</p>
                  </div>
                ))}
              </div>

              {/* Action Trigger */}
              <button
                onClick={handleConfirmOption}
                className="btn-primary"
                disabled={selectedOption === null}
                style={{ width: "100%", justifyContent: "center", py: "14px", opacity: selectedOption === null ? 0.5 : 1 }}
              >
                Submit Decision
              </button>
            </div>
          ) : (
            /* Outcome Simulation Screen */
            <div className="glass-panel" style={{ padding: "35px", borderTop: `4px solid ${activeScenario.options[selectedOption].resultType === "smart" ? "var(--success)" : activeScenario.options[selectedOption].resultType === "mediocre" ? "var(--warning)" : "var(--danger)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontSize: "1.4rem" }}>Simulation Results</h3>
                <span className={
                  activeScenario.options[selectedOption].resultType === "smart" ? "badge-success" : 
                  activeScenario.options[selectedOption].resultType === "mediocre" ? "badge-warning" : "badge-danger"
                } style={{ textTransform: "uppercase", fontSize: "0.8rem", padding: "6px 12px" }}>
                  {activeScenario.options[selectedOption].resultType} choice
                </span>
              </div>

              <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "20px", borderRadius: "var(--border-radius-md)", borderLeft: "4px solid rgba(255,255,255,0.1)", marginBottom: "25px" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>YOUR CHOICE:</p>
                <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>{activeScenario.options[selectedOption].text}</p>
              </div>

              <p style={{ fontSize: "1.05rem", lineHeight: "1.6", color: "var(--text-primary)", marginBottom: "30px" }}>
                {activeScenario.options[selectedOption].explanation}
              </p>

              {/* Show Shock Event if one was triggered */}
              {triggeredEvent && (
                <div className="glass-panel" style={{ padding: "25px", border: "1px solid var(--danger)", background: "rgba(244, 63, 94, 0.05)", marginBottom: "30px", animation: "pulseGlow 2s infinite" }}>
                  <h4 style={{ color: "var(--danger)", display: "flex", alignItems: "center", gap: "8px", fontSize: "1.1rem", marginBottom: "10px" }}>
                    <ShieldAlert size={18} />
                    SHOCK EVENT: {triggeredEvent.eventName}
                  </h4>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                    {triggeredEvent.eventText}
                  </p>
                </div>
              )}

              <button onClick={handleNextStep} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {scenarioIndex + 1 === persona.scenarios.length ? "Finish & Audit Score" : "Continue to Next Scenario"}
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Real-Time Balance Sheet & Event Log */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Balance Sheet Graphic */}
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h4 style={{ fontSize: "1.1rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Wallet size={16} style={{ color: "var(--primary)" }} />
              Net Worth
            </h4>
            
            <div style={{ fontSize: "2rem", fontWeight: "800", color: netWorth >= 0 ? "var(--success)" : "var(--danger)", marginBottom: "8px" }}>
              ${netWorth.toLocaleString()}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--border)", paddingTop: "15px", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Cash Assets</span>
                <span style={{ fontWeight: "600" }}>${cash.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Investments</span>
                <span style={{ fontWeight: "600", color: "var(--success)" }}>${investment.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Liabilities</span>
                <span style={{ fontWeight: "600", color: "var(--danger)" }}>${debt.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Event Logs */}
          <div className="glass-panel" style={{ padding: "20px", maxHeight: "250px", overflowY: "auto" }}>
            <h4 style={{ fontSize: "0.95rem", marginBottom: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>Transaction Logs</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {eventsLog.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: "0.8rem",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    background: log.type === "danger" ? "var(--danger-glow)" : log.type === "success" ? "var(--success-glow)" : log.type === "warning" ? "var(--warning-glow)" : "rgba(255,255,255,0.02)",
                    color: log.type === "danger" ? "var(--danger)" : log.type === "success" ? "var(--success)" : log.type === "warning" ? "var(--warning)" : "var(--text-secondary)",
                    borderLeft: `3px solid ${log.type === "danger" ? "var(--danger)" : log.type === "success" ? "var(--success)" : log.type === "warning" ? "var(--warning)" : "var(--text-muted)"}`
                  }}
                >
                  {log.text}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
