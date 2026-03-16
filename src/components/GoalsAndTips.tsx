import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserData, Goal } from "@/types/finance";
import { getAITips, formatINR, getGoalInvestmentPlan, getGoalTips } from "@/lib/financeUtils";
import { Plus, Target, Trash2, ChevronDown, ChevronUp, TrendingUp, Calendar, Zap, X } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  userData: UserData;
}

const GOAL_ICONS = ["🎯", "✈️", "📱", "🎓", "🏠", "🚗", "💍", "🏋️", "🎵", "🛡️", "💻", "⛵"];
const PRIORITY_CONFIG = {
  low: { label: "Low", color: "hsl(var(--muted-foreground))", bg: "hsl(var(--muted))" },
  medium: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  high: { label: "High", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
};

const TERM_BADGE = {
  short: { label: "Short Term (≤3 mo)", color: "#22d3ee" },
  medium: { label: "Medium Term (3–12 mo)", color: "#a78bfa" },
  long: { label: "Long Term (1+ yr)", color: "#f97316" },
};

function getMonthsRemaining(deadline: string): number {
  const end = new Date(deadline);
  const now = new Date();
  const diff = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
  return Math.max(diff, 0);
}

function getDaysRemaining(deadline: string): number {
  const end = new Date(deadline);
  const now = new Date();
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(diff, 0);
}

export function GoalsAndTips({ userData }: Props) {
  const tips = getAITips(userData);
  const today = new Date();
  const defaultDeadline = new Date(today.getFullYear(), today.getMonth() + 3, 1).toISOString().slice(0, 7);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1", name: "Emergency Fund", targetAmount: 50000, savedAmount: userData.savings * 2,
      deadline: new Date(today.getFullYear(), today.getMonth() + 8, 1).toISOString().slice(0, 7),
      icon: "🛡️", priority: "high", timeMonths: 8, startDate: today.toISOString().slice(0, 7), category: "Savings",
    },
    {
      id: "2", name: "Laptop Purchase", targetAmount: 80000, savedAmount: userData.savings * 3,
      deadline: new Date(today.getFullYear(), today.getMonth() + 5, 1).toISOString().slice(0, 7),
      icon: "💻", priority: "medium", timeMonths: 5, startDate: today.toISOString().slice(0, 7), category: "Tech",
    },
    {
      id: "3", name: "Tourist Trip", targetAmount: 30000, savedAmount: userData.savings,
      deadline: new Date(today.getFullYear(), today.getMonth() + 2, 1).toISOString().slice(0, 7),
      icon: "✈️", priority: "low", timeMonths: 2, startDate: today.toISOString().slice(0, 7), category: "Travel",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: "", target: "", timeMonths: "3", priority: "medium" as 'low' | 'medium' | 'high', icon: "🎯",
  });

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target) return;
    const months = parseInt(newGoal.timeMonths) || 3;
    const deadlineDate = new Date(today.getFullYear(), today.getMonth() + months, 1);
    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: Number(newGoal.target),
      savedAmount: 0,
      deadline: deadlineDate.toISOString().slice(0, 7),
      icon: newGoal.icon,
      priority: newGoal.priority,
      timeMonths: months,
      startDate: today.toISOString().slice(0, 7),
      category: "Custom",
    };
    setGoals(prev => [...prev, goal]);
    setShowAdd(false);
    setNewGoal({ name: "", target: "", timeMonths: "3", priority: "medium", icon: "🎯" });
  };

  const deleteGoal = (id: string) => setGoals(prev => prev.filter(g => g.id !== id));

  return (
    <section className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-foreground">🎯 Financial Goals</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Set, track, and achieve your financial milestones</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl gradient-primary font-semibold transition-all hover:opacity-90 shadow-sm"
          style={{ color: "hsl(var(--primary-foreground))" }}
        >
          {showAdd ? <X size={13} /> : <Plus size={13} />}
          {showAdd ? "Cancel" : "New Goal"}
        </button>
      </div>

      {/* Add Goal Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            className="glass-card p-5 border border-primary/20"
          >
            <h3 className="font-bold text-sm text-foreground mb-4">✨ Create New Goal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Goal Name</label>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="e.g. Tourist Trip, Bike, Laptop"
                  value={newGoal.name}
                  onChange={e => setNewGoal(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Target Amount (₹)</label>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="e.g. 50000"
                  type="number"
                  value={newGoal.target}
                  onChange={e => setNewGoal(p => ({ ...p, target: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Time to Achieve (months)</label>
                <input
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  type="number"
                  min={1}
                  max={120}
                  value={newGoal.timeMonths}
                  onChange={e => setNewGoal(p => ({ ...p, timeMonths: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Priority Level</label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setNewGoal(prev => ({ ...prev, priority: p }))}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all capitalize ${newGoal.priority === p ? 'border-primary' : 'border-border'}`}
                      style={newGoal.priority === p ? { background: PRIORITY_CONFIG[p].bg, color: PRIORITY_CONFIG[p].color } : {}}
                    >
                      {PRIORITY_CONFIG[p].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs text-muted-foreground mb-2 block">Choose Icon</label>
              <div className="flex gap-2 flex-wrap">
                {GOAL_ICONS.map(icon => (
                  <button key={icon} onClick={() => setNewGoal(p => ({ ...p, icon }))}
                    className={`text-xl p-1.5 rounded-lg transition-all ${newGoal.icon === icon ? "ring-2 ring-primary bg-primary/10" : "hover:bg-muted"}`}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={addGoal}
              className="mt-4 w-full gradient-primary text-sm py-2.5 rounded-xl font-bold shadow-sm hover:opacity-90 transition-all"
              style={{ color: "hsl(var(--primary-foreground))" }}
            >
              🚀 Create Goal & Generate AI Plan
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {goals.map((goal, i) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            userData={userData}
            index={i}
            expanded={expandedGoal === goal.id}
            onExpand={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
            onDelete={() => deleteGoal(goal.id)}
          />
        ))}
      </div>

      {/* AI General Tips + SIP Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">💡 AI Savings Tips</h2>
          <div className="flex flex-col gap-3">
            {tips.map((tip, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-4 text-sm text-foreground leading-relaxed border-l-4" style={{ borderLeftColor: "hsl(var(--primary))" }}>
                {tip}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="glass-card p-5">
          <h3 className="font-semibold text-sm mb-3">🧮 Quick Investment Calculator</h3>
          <SIPCalculator />
        </div>
      </div>
    </section>
  );
}

interface GoalCardProps {
  goal: Goal;
  userData: UserData;
  index: number;
  expanded: boolean;
  onExpand: () => void;
  onDelete: () => void;
}

function GoalCard({ goal, userData, index, expanded, onExpand, onDelete }: GoalCardProps) {
  const pct = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const monthsLeft = getMonthsRemaining(goal.deadline);
  const daysLeft = getDaysRemaining(goal.deadline);
  const plan = getGoalInvestmentPlan(userData.savings, goal.targetAmount, goal.timeMonths, userData.riskLevel);
  const goalTips = getGoalTips(userData.savings, plan.monthlySaving, goal.targetAmount);
  const remaining = goal.targetAmount - goal.savedAmount;
  const priority = PRIORITY_CONFIG[goal.priority];
  const termBadge = TERM_BADGE[plan.term];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "hsl(var(--muted))" }}>
              {goal.icon}
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">{goal.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold capitalize" style={{ background: priority.bg, color: priority.color }}>
                  {priority.label}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: `${termBadge.color}18`, color: termBadge.color }}>
                  {termBadge.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={onDelete} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
              <Trash2 size={13} />
            </button>
            <button onClick={onExpand} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">Target</p>
            <p className="text-xs font-bold text-foreground">{formatINR(goal.targetAmount)}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">Saved</p>
            <p className="text-xs font-bold text-green-success">{formatINR(goal.savedAmount)}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">Remaining</p>
            <p className="text-xs font-bold text-primary">{formatINR(remaining)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: index * 0.08 }}
            className="h-full rounded-full gradient-primary"
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-muted-foreground">{pct.toFixed(0)}% complete</span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
            <Calendar size={9} /> {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
          </span>
        </div>

        {/* Monthly / Weekly Saving needed */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg p-2 text-center" style={{ background: "hsl(var(--muted))" }}>
            <p className="text-[10px] text-muted-foreground">Monthly Needed</p>
            <p className="text-xs font-bold text-foreground">{formatINR(Math.round(plan.monthlySaving))}</p>
          </div>
          <div className="rounded-lg p-2 text-center" style={{ background: "hsl(var(--muted))" }}>
            <p className="text-[10px] text-muted-foreground">Weekly Needed</p>
            <p className="text-xs font-bold text-foreground">{formatINR(Math.round(plan.weeklySaving))}</p>
          </div>
        </div>
      </div>

      {/* Expanded: AI Investment Plan + Tips */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-4 flex flex-col gap-4">
              {/* AI Investment Plan */}
              <div>
                <div className="flex items-center gap-1.5 mb-3">
                  <TrendingUp size={14} className="text-primary" />
                  <h4 className="text-xs font-bold text-foreground">AI Smart Investment Plan</h4>
                </div>

                {/* Pie Chart */}
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={plan.allocations} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="percentage" paddingAngle={3}>
                        {plan.allocations.map((a, idx) => (
                          <Cell key={idx} fill={a.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v) => [`${v}%`]}
                        contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Allocation Bars */}
                <div className="flex flex-col gap-1.5 mt-1">
                  {plan.allocations.map((a, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-base w-5">{a.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] mb-0.5">
                          <span className="text-foreground font-medium">{a.label}</span>
                          <span style={{ color: a.color }} className="font-bold">{a.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${a.percentage}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: a.color }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Explanation */}
                <div className="mt-3 rounded-xl p-3 text-xs text-foreground leading-relaxed" style={{ background: "hsl(var(--muted))" }}>
                  🤖 <span className="font-semibold">AI Says:</span> {plan.explanation}
                </div>
              </div>

              {/* Goal Tips */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap size={13} className="text-primary" />
                  <h4 className="text-xs font-bold text-foreground">AI Tips to Reach Faster</h4>
                </div>
                <div className="flex flex-col gap-1.5">
                  {goalTips.map((tip, i) => (
                    <div key={i} className="text-xs text-foreground leading-relaxed p-2 rounded-lg border-l-2" style={{ borderLeftColor: "hsl(var(--primary))", background: "hsl(var(--muted))" }}>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand Hint */}
      {!expanded && (
        <button
          onClick={onExpand}
          className="w-full py-2 text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 border-t border-border"
        >
          <TrendingUp size={10} /> View AI Investment Plan
        </button>
      )}
    </motion.div>
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
          <p className="text-sm font-bold text-green-500">{formatINR(gain)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Maturity</p>
          <p className="text-sm font-bold text-primary">{formatINR(maturity)}</p>
        </div>
      </div>
    </div>
  );
}
