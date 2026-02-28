import { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import heroImage from "@/assets/hero-finance.png";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles, TrendingUp, Shield, ChevronRight } from "lucide-react";

interface Props {
  onSubmit: (data: UserData) => void;
}

export function WelcomePage({ onSubmit }: Props) {
  const [form, setForm] = useState({ username: "", income: "", expenses: "", savings: "", riskLevel: "medium" as UserData["riskLevel"] });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.username.trim()) e.username = "Name is required";
    if (!form.income || Number(form.income) <= 0) e.income = "Enter valid income";
    if (!form.expenses || Number(form.expenses) < 0) e.expenses = "Enter valid expenses";
    if (!form.savings || Number(form.savings) < 0) e.savings = "Enter valid savings";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const data: UserData = { username: form.username, income: Number(form.income), expenses: Number(form.expenses), savings: Number(form.savings), riskLevel: form.riskLevel };
    localStorage.setItem("smartsave_user", JSON.stringify(data));
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles size={16} style={{ color: "hsl(var(--primary-foreground))" }} />
          </div>
          <span className="font-black text-lg text-foreground">SmartSave<span className="text-primary"> AI</span></span>
        </div>
        <ThemeToggle />
      </nav>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left - Hero */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-16"
        >
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border border-primary/20"
              style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>
              <Sparkles size={12} /> AI-Powered Financial Planning
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-tight mb-4">
              Make Your Money <span className="text-primary">Work Smarter</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Get AI-powered investment advice, track your savings goals, and build wealth with personalized strategies — all in one place.
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {[
                { icon: TrendingUp, text: "Smart investment allocation based on your risk profile" },
                { icon: Shield, text: "Personalized financial health score & AI tips" },
                { icon: Sparkles, text: "Goal-based savings planner with progress tracking" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon size={14} style={{ color: "hsl(var(--primary-foreground))" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>

            <motion.img
              src={heroImage}
              alt="Financial growth chart"
              className="rounded-2xl w-full max-w-sm shadow-2xl animate-float hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex items-center justify-center px-6 py-12 lg:px-12 lg:w-[480px]"
        >
          <div className="w-full max-w-md glass-card p-8">
            <h2 className="text-2xl font-black text-foreground mb-2">Get Your Smart Plan</h2>
            <p className="text-sm text-muted-foreground mb-6">Enter your financial details to generate your personalized AI investment strategy.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Your Name</label>
                <input
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="e.g. Rahul Sharma"
                  value={form.username}
                  onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                />
                {errors.username && <p className="text-xs text-red-danger mt-1">{errors.username}</p>}
              </div>

              {/* Income */}
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Monthly Income (₹)</label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="e.g. 50000"
                  value={form.income}
                  onChange={e => setForm(p => ({ ...p, income: e.target.value }))}
                />
                {errors.income && <p className="text-xs text-red-danger mt-1">{errors.income}</p>}
              </div>

              {/* Expenses */}
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Monthly Expenses (₹)</label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="e.g. 30000"
                  value={form.expenses}
                  onChange={e => setForm(p => ({ ...p, expenses: e.target.value }))}
                />
                {errors.expenses && <p className="text-xs text-red-danger mt-1">{errors.expenses}</p>}
              </div>

              {/* Savings */}
              <div>
                <label className="text-xs font-semibold text-foreground mb-1 block">Monthly Savings (₹)</label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="e.g. 10000"
                  value={form.savings}
                  onChange={e => setForm(p => ({ ...p, savings: e.target.value }))}
                />
                {errors.savings && <p className="text-xs text-red-danger mt-1">{errors.savings}</p>}
              </div>

              {/* Risk Level */}
              <div>
                <label className="text-xs font-semibold text-foreground mb-2 block">Risk Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["low", "medium", "high"] as const).map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, riskLevel: level }))}
                      className={`py-2.5 rounded-xl text-xs font-semibold capitalize border-2 transition-all ${form.riskLevel === level ? "border-primary gradient-primary" : "border-border bg-secondary text-muted-foreground hover:border-primary/50"}`}
                      style={form.riskLevel === level ? { color: "hsl(var(--primary-foreground))" } : {}}
                    >
                      {level === "low" ? "🛡️ Low" : level === "medium" ? "⚖️ Medium" : "🚀 High"}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full gradient-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2 shadow-lg hover:opacity-95 transition-opacity"
                style={{ color: "hsl(var(--primary-foreground))" }}
              >
                Generate My Smart Plan <ChevronRight size={16} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
