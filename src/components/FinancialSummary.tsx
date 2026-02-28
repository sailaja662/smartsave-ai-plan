import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import { calculateHealthScore, getHealthLabel } from "@/lib/financeUtils";
import { formatINR } from "@/lib/financeUtils";
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Activity } from "lucide-react";

interface Props {
  userData: UserData;
}

export function FinancialSummary({ userData }: Props) {
  const { income, expenses, savings } = userData;
  const remaining = income - expenses - savings;
  const savingsPercent = income > 0 ? ((savings / income) * 100).toFixed(1) : "0";
  const healthScore = calculateHealthScore(userData);
  const health = getHealthLabel(healthScore);

  const stats = [
    { label: "Monthly Income", value: formatINR(income), icon: TrendingUp, gradient: "gradient-green", change: "+stable" },
    { label: "Monthly Expenses", value: formatINR(expenses), icon: TrendingDown, gradient: "gradient-primary", change: `${income > 0 ? ((expenses / income) * 100).toFixed(0) : 0}% of income` },
    { label: "Monthly Savings", value: formatINR(savings), icon: PiggyBank, gradient: "gradient-gold", change: `${savingsPercent}% savings rate` },
    { label: "Remaining Balance", value: formatINR(remaining), icon: Wallet, gradient: remaining >= 0 ? "gradient-green" : "", change: remaining >= 0 ? "Available" : "Deficit!" },
  ];

  return (
    <section>
      <h2 className="section-title mb-4">📊 Financial Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="stat-card"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.gradient}`}>
              <stat.icon size={20} className="text-foreground" style={{ color: "hsl(var(--primary-foreground))" }} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Health Score Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity size={18} style={{ color: health.color }} />
            <span className="section-title">Financial Health Score</span>
          </div>
          <span className="text-2xl font-black" style={{ color: health.color }}>{healthScore}/100</span>
        </div>
        <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${healthScore}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: health.color }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Poor</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: health.bg, color: health.color }}>
            {health.label}
          </span>
          <span className="text-xs text-muted-foreground">Excellent</span>
        </div>
      </motion.div>
    </section>
  );
}
