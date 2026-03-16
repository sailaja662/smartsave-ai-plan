import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Search, Filter } from "lucide-react";

const MUTUAL_FUNDS = [
  { name: "SBI Bluechip Fund", house: "SBI MF", category: "Large Cap", risk: "Medium", return1y: 18.5, return5y: 14.2, minSip: 500, aum: "₹45,234 Cr", rating: 5 },
  { name: "ICICI Prudential Equity & Debt", house: "ICICI Prudential", category: "Hybrid", risk: "Medium", return1y: 21.3, return5y: 15.8, minSip: 500, aum: "₹28,641 Cr", rating: 5 },
  { name: "HDFC Mid-Cap Opportunities", house: "HDFC MF", category: "Mid Cap", risk: "High", return1y: 35.2, return5y: 20.1, minSip: 500, aum: "₹72,819 Cr", rating: 5 },
  { name: "Axis Long Term Equity (ELSS)", house: "Axis MF", category: "ELSS", risk: "Medium", return1y: 16.8, return5y: 13.5, minSip: 500, aum: "₹34,521 Cr", rating: 4 },
  { name: "Mirae Asset Large Cap Fund", house: "Mirae Asset", category: "Large Cap", risk: "Medium", return1y: 17.9, return5y: 15.1, minSip: 1000, aum: "₹38,924 Cr", rating: 5 },
  { name: "Parag Parikh Flexi Cap Fund", house: "PPFAS MF", category: "Flexi Cap", risk: "Medium", return1y: 22.4, return5y: 18.3, minSip: 1000, aum: "₹62,441 Cr", rating: 5 },
  { name: "SBI Small Cap Fund", house: "SBI MF", category: "Small Cap", risk: "High", return1y: 28.6, return5y: 22.4, minSip: 500, aum: "₹25,180 Cr", rating: 5 },
  { name: "Kotak Emerging Equity Fund", house: "Kotak MF", category: "Mid Cap", risk: "High", return1y: 31.4, return5y: 19.8, minSip: 500, aum: "₹48,350 Cr", rating: 4 },
  { name: "Nippon India Liquid Fund", house: "Nippon MF", category: "Liquid", risk: "Low", return1y: 7.2, return5y: 6.8, minSip: 500, aum: "₹19,821 Cr", rating: 4 },
  { name: "HDFC Flexi Cap Fund", house: "HDFC MF", category: "Flexi Cap", risk: "Medium", return1y: 24.1, return5y: 17.3, minSip: 500, aum: "₹55,420 Cr", rating: 5 },
  { name: "Axis Small Cap Fund", house: "Axis MF", category: "Small Cap", risk: "High", return1y: 26.8, return5y: 21.2, minSip: 500, aum: "₹21,340 Cr", rating: 4 },
  { name: "SBI Debt Fund", house: "SBI MF", category: "Debt", risk: "Low", return1y: 8.1, return5y: 7.4, minSip: 500, aum: "₹12,540 Cr", rating: 4 },
];

const CATEGORIES = ["All", "Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "Hybrid", "ELSS", "Liquid", "Debt"];
const RISK_COLORS: Record<string, string> = { Low: "green-success", Medium: "yellow-warn", High: "red-danger" };

function Stars({ n }: { n: number }) {
  return <span className="text-xs">{Array.from({ length: 5 }, (_, i) => i < n ? "⭐" : "☆").join("")}</span>;
}

export function MutualFunds() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = MUTUAL_FUNDS.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.house.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || f.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Search funds..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter size={13} className="text-muted-foreground flex-shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === cat ? "gradient-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              style={category === cat ? { color: "hsl(var(--primary-foreground))" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="pb-3 font-semibold">Fund Name</th>
              <th className="pb-3 font-semibold">Category</th>
              <th className="pb-3 font-semibold">Risk</th>
              <th className="pb-3 font-semibold text-right">1Y Return</th>
              <th className="pb-3 font-semibold text-right">5Y Return</th>
              <th className="pb-3 font-semibold text-right">Min SIP</th>
              <th className="pb-3 font-semibold text-right">AUM</th>
              <th className="pb-3 font-semibold text-center">Rating</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => (
              <motion.tr
                key={f.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.house}</p>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{f.category}</span>
                </td>
                <td className="py-3">
                  <span className={`text-xs font-semibold text-${RISK_COLORS[f.risk]}`}>{f.risk}</span>
                </td>
                <td className="py-3 text-right font-bold text-green-success">+{f.return1y}%</td>
                <td className="py-3 text-right font-bold text-primary">+{f.return5y}%</td>
                <td className="py-3 text-right text-foreground font-medium">₹{f.minSip}</td>
                <td className="py-3 text-right text-muted-foreground text-xs">{f.aum}</td>
                <td className="py-3 text-center"><Stars n={f.rating} /></td>
                <td className="py-3 text-right">
                  <button className="text-xs px-3 py-1.5 rounded-lg gradient-primary font-semibold hover:opacity-90 transition-all" style={{ color: "hsl(var(--primary-foreground))" }}>
                    Invest
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-sm text-foreground">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.house}</p>
              </div>
              <Stars n={f.rating} />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">1Y Return</p>
                <p className="text-sm font-bold text-green-success">+{f.return1y}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">5Y Return</p>
                <p className="text-sm font-bold text-primary">+{f.return5y}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Min SIP</p>
                <p className="text-sm font-bold text-foreground">₹{f.minSip}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{f.category}</span>
                <span className={`text-xs font-semibold text-${RISK_COLORS[f.risk]}`}>{f.risk} Risk</span>
              </div>
              <button className="text-xs px-3 py-1.5 rounded-lg gradient-primary font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>Invest</button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">* Returns are indicative based on historical NAV data. Past performance is not indicative of future results.</p>
    </div>
  );
}
