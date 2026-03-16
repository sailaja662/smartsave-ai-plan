import { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import { MutualFunds } from "@/components/markets/MutualFunds";
import { GoldETF } from "@/components/markets/GoldETF";
import { StockMarket } from "@/components/markets/StockMarket";
import { FixedDeposits } from "@/components/markets/FixedDeposits";
import { formatINR } from "@/lib/financeUtils";
import { ExternalLink, Info } from "lucide-react";

interface Props {
  userData: UserData;
}

const MARKET_TABS = [
  { id: "mf", label: "📈 Mutual Funds", desc: "Top-rated funds from leading AMCs" },
  { id: "gold", label: "🪙 Gold ETFs", desc: "Gold investment options" },
  { id: "stocks", label: "📊 Stocks", desc: "NSE/BSE & Global equities" },
  { id: "fd", label: "🏦 Fixed Deposits", desc: "Bank FD rates & calculator" },
];

export function MarketData({ userData }: Props) {
  const [tab, setTab] = useState("mf");

  const monthlyInvestable = userData.savings;
  const suggestions = [
    { label: "Mutual Fund SIP", amount: Math.round(monthlyInvestable * 0.4), pct: 40, color: "#a78bfa", icon: "📈" },
    { label: "Gold ETF", amount: Math.round(monthlyInvestable * 0.2), pct: 20, color: "#facc15", icon: "🪙" },
    { label: "Fixed Deposit", amount: Math.round(monthlyInvestable * 0.3), pct: 30, color: "#22d3ee", icon: "🏦" },
    { label: "Stocks (SIP)", amount: Math.round(monthlyInvestable * 0.1), pct: 10, color: "#f97316", icon: "📊" },
  ];

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-foreground">📊 Investment Markets</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Real investment options — Mutual Funds, Gold ETFs, Stocks & Fixed Deposits</p>
      </div>

      {/* AI Quick Suggestion Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 border border-primary/20"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">AI Advisor says:</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              You are saving <span className="font-semibold text-foreground">{formatINR(monthlyInvestable)}</span> monthly.
              Based on your <span className="font-semibold text-primary capitalize">{userData.riskLevel}</span> risk preference,
              here's the optimal monthly allocation:
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {suggestions.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-3 text-center cursor-pointer hover:scale-105 transition-transform"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
              onClick={() => setTab(s.label.includes("Mutual") ? "mf" : s.label.includes("Gold") ? "gold" : s.label.includes("Deposit") ? "fd" : "stocks")}
            >
              <span className="text-xl">{s.icon}</span>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              <p className="text-base font-black" style={{ color: s.color }}>{formatINR(s.amount)}</p>
              <p className="text-[10px] text-muted-foreground">{s.pct}% of savings</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {MARKET_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t.id ? "gradient-primary shadow-sm" : "glass-card text-muted-foreground hover:text-foreground"}`}
            style={tab === t.id ? { color: "hsl(var(--primary-foreground))" } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {tab === "mf" && <MutualFunds />}
        {tab === "gold" && <GoldETF />}
        {tab === "stocks" && <StockMarket />}
        {tab === "fd" && <FixedDeposits />}
      </motion.div>

      {/* Disclaimer Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4 border border-yellow-warn/20 flex items-start gap-3"
      >
        <Info size={16} className="text-yellow-warn flex-shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Disclaimer: </span>
          SmartSave AI provides financial insights and suggestions only. All investments are completed on official financial platforms. Mutual fund investments are subject to market risks — please read all scheme-related documents carefully before investing. Fixed deposit rates may vary; check with your bank for the latest rates.
        </p>
      </motion.div>
    </section>
  );
}
