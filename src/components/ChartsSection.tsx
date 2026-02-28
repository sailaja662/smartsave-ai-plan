import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import { formatINR, calculateFutureValue } from "@/lib/financeUtils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, Legend
} from "recharts";

interface Props {
  userData: UserData;
}

export function ChartsSection({ userData }: Props) {
  const { income, expenses, savings } = userData;

  // Monthly overview bar data (simulated 6 months)
  const monthlyData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => ({
    month,
    Expenses: Math.round(expenses * (0.9 + Math.random() * 0.2)),
    Savings: Math.round(savings * (0.85 + Math.random() * 0.3)),
    Income: income,
  }));

  // Growth prediction
  const growthData = [0, 1, 2, 3, 5, 7, 10].map(year => ({
    year: year === 0 ? "Now" : `${year}Y`,
    Conservative: Math.round(calculateFutureValue(savings * 12, 7, year)),
    Moderate: Math.round(calculateFutureValue(savings * 12, 12, year)),
    Aggressive: Math.round(calculateFutureValue(savings * 12, 18, year)),
  }));

  return (
    <section>
      <h2 className="section-title mb-4">📈 Analytics & Growth</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Monthly Income vs Expenses vs Savings</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Legend iconSize={8} />
              <Bar dataKey="Income" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#f97316" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Savings" fill="#facc15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Growth chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Investment Growth Prediction</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMod" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAgg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Legend iconSize={8} />
              <Area type="monotone" dataKey="Conservative" stroke="#22d3ee" fill="url(#colorCons)" strokeWidth={2} />
              <Area type="monotone" dataKey="Moderate" stroke="#a78bfa" fill="url(#colorMod)" strokeWidth={2} />
              <Area type="monotone" dataKey="Aggressive" stroke="#f97316" fill="url(#colorAgg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  );
}
