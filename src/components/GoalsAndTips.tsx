import { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import { getAITips, formatINR } from "@/lib/financeUtils";
import { Goal } from "@/types/finance";
import { Plus, Target } from "lucide-react";

interface Props {
  userData: UserData;
}

const PRESET_GOALS = [
  { name: "Emergency Fund", icon: "🛡️", target: 50000 },
  { name: "House Down Payment", icon: "🏠", target: 500000 },
  { name: "Car Purchase", icon: "🚗", target: 300000 },
  { name: "Education Fund", icon: "🎓", target: 200000 },
];

export function GoalsAndTips({ userData }: Props) {
  const tips = getAITips(userData);
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", name: "Emergency Fund", targetAmount: 50000, savedAmount: userData.savings * 2, deadline: "2025-12", icon: "🛡️" },
    { id: "2", name: "Car Purchase", targetAmount: 300000, savedAmount: userData.savings * 5, deadline: "2026-06", icon: "🚗" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: "", target: "", icon: "🎯" });

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target) return;
    setGoals(prev => [...prev, {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: Number(newGoal.target),
      savedAmount: 0,
      deadline: "2026-12",
      icon: newGoal.icon,
    }]);
    setShowAdd(false);
    setNewGoal({ name: "", target: "", icon: "🎯" });
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">🎯 Financial Goals</h2>
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg gradient-primary font-semibold transition-all hover:opacity-90"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              <Plus size={12} /> Add Goal
            </button>
          </div>

          {showAdd && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 mb-3 flex flex-col gap-2">
              <input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                placeholder="Goal name (e.g. Vacation)"
                value={newGoal.name}
                onChange={e => setNewGoal(p => ({ ...p, name: e.target.value }))}
              />
              <input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                placeholder="Target amount (₹)"
                type="number"
                value={newGoal.target}
                onChange={e => setNewGoal(p => ({ ...p, target: e.target.value }))}
              />
              <div className="flex gap-2">
                {["🎯", "✈️", "💍", "📱", "🏋️", "🎵"].map(icon => (
                  <button key={icon} onClick={() => setNewGoal(p => ({ ...p, icon }))}
                    className={`text-lg p-1 rounded ${newGoal.icon === icon ? "ring-2 ring-primary" : ""}`}>{icon}</button>
                ))}
              </div>
              <button onClick={addGoal} className="gradient-primary text-xs py-2 rounded-lg font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
                Add Goal
              </button>
            </motion.div>
          )}

          <div className="flex flex-col gap-3">
            {goals.map((goal, i) => {
              const pct = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
              return (
                <motion.div key={goal.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{goal.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{goal.name}</p>
                        <p className="text-xs text-muted-foreground">Target: {formatINR(goal.targetAmount)}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary">{pct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full gradient-primary" />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Saved: {formatINR(goal.savedAmount)}</span>
                    <span className="text-xs text-muted-foreground">By {goal.deadline}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Tips */}
        <div>
          <h2 className="section-title mb-4">💡 AI Savings Tips</h2>
          <div className="flex flex-col gap-3">
            {tips.map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-4 text-sm text-foreground leading-relaxed border-l-4" style={{ borderLeftColor: "hsl(var(--primary))" }}>
                {tip}
              </motion.div>
            ))}
          </div>

          {/* Investment Calculator */}
          <div className="glass-card p-5 mt-4">
            <h3 className="font-semibold text-sm mb-3">🧮 Quick Investment Calculator</h3>
            <SIPCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

function SIPCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);

  const n = years * 12;
  const r = rate / 100 / 12;
  const maturity = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = monthly * n;
  const gain = maturity - invested;

  return (
    <div className="flex flex-col gap-3">
      {[
        { label: "Monthly SIP (₹)", value: monthly, setter: setMonthly, min: 500, max: 100000, step: 500 },
        { label: `Rate: ${rate}% p.a.`, value: rate, setter: setRate, min: 4, max: 25, step: 0.5 },
        { label: `Duration: ${years} years`, value: years, setter: setYears, min: 1, max: 30, step: 1 },
      ].map(({ label, value, setter, min, max, step }) => (
        <div key={label}>
          <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>{label}</span></div>
          <input type="range" min={min} max={max} step={step} value={value}
            onChange={e => setter(Number(e.target.value))}
            className="w-full accent-primary" />
        </div>
      ))}
      <div className="grid grid-cols-3 gap-2 mt-1">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Invested</p>
          <p className="text-sm font-bold text-foreground">{formatINR(invested)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Gains</p>
          <p className="text-sm font-bold text-green-success">{formatINR(gain)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Maturity</p>
          <p className="text-sm font-bold text-primary">{formatINR(maturity)}</p>
        </div>
      </div>
    </div>
  );
}
