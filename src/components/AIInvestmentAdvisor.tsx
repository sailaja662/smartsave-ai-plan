import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import { getInvestmentAllocations, formatINR } from "@/lib/financeUtils";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  userData: UserData;
}

const riskBadge = (risk: string) => {
  if (risk === "Low") return <span className="badge-low">{risk}</span>;
  if (risk === "Medium") return <span className="badge-medium">{risk}</span>;
  return <span className="badge-high">{risk}</span>;
};

export function AIInvestmentAdvisor({ userData }: Props) {
  const allocations = getInvestmentAllocations(userData);
  const pieData = allocations.map(a => ({ name: a.category, value: a.percentage, color: a.color }));

  const riskMessages = {
    low: "Based on your conservative risk preference, we recommend capital-protected instruments with steady returns.",
    medium: "Based on your moderate risk preference, a diversified mix of growth and stability is recommended.",
    high: "Based on your aggressive risk preference, growth-oriented instruments with higher volatility are suggested.",
  };

  return (
    <section>
      <h2 className="section-title mb-1">🤖 AI Investment Advisor</h2>
      <p className="text-sm text-muted-foreground mb-4">{riskMessages[userData.riskLevel]}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Investment Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Allocation Cards */}
        <div className="flex flex-col gap-3">
          {allocations.map((alloc, i) => (
            <motion.div
              key={alloc.category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="text-2xl">{alloc.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-foreground">{alloc.category}</span>
                  <span className="font-bold text-sm" style={{ color: alloc.color }}>{alloc.percentage}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${alloc.percentage}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: alloc.color }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{alloc.expectedReturn}</span>
                  {riskBadge(alloc.risk)}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="glass-card p-3 text-sm text-muted-foreground">
            📌 Monthly amount to invest: <span className="font-semibold text-foreground">{formatINR(userData.savings)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
