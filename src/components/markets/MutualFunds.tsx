import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ExternalLink } from "lucide-react";

const MUTUAL_FUNDS = [
  { name: "SBI Bluechip Fund", house: "SBI MF", category: "Large Cap", risk: "Medium", return1y: 18.5, return5y: 14.2, minSip: 500, aum: "₹45,234 Cr", rating: 5, nav: 72.43, schemeCode: "119598" },
  { name: "ICICI Prudential Equity & Debt", house: "ICICI Prudential", category: "Hybrid", risk: "Medium", return1y: 21.3, return5y: 15.8, minSip: 500, aum: "₹28,641 Cr", rating: 5, nav: 342.81, schemeCode: "120586" },
  { name: "HDFC Mid-Cap Opportunities", house: "HDFC MF", category: "Mid Cap", risk: "High", return1y: 35.2, return5y: 20.1, minSip: 500, aum: "₹72,819 Cr", rating: 5, nav: 186.24, schemeCode: "118989" },
  { name: "Axis Long Term Equity (ELSS)", house: "Axis MF", category: "ELSS", risk: "Medium", return1y: 16.8, return5y: 13.5, minSip: 500, aum: "₹34,521 Cr", rating: 4, nav: 89.12, schemeCode: "120503" },
  { name: "Mirae Asset Large Cap Fund", house: "Mirae Asset", category: "Large Cap", risk: "Medium", return1y: 17.9, return5y: 15.1, minSip: 1000, aum: "₹38,924 Cr", rating: 5, nav: 104.36, schemeCode: "118834" },
  { name: "Parag Parikh Flexi Cap Fund", house: "PPFAS MF", category: "Flexi Cap", risk: "Medium", return1y: 22.4, return5y: 18.3, minSip: 1000, aum: "₹62,441 Cr", rating: 5, nav: 78.91, schemeCode: "122639" },
  { name: "SBI Small Cap Fund", house: "SBI MF", category: "Small Cap", risk: "High", return1y: 28.6, return5y: 22.4, minSip: 500, aum: "₹25,180 Cr", rating: 5, nav: 165.48, schemeCode: "125494" },
  { name: "Kotak Emerging Equity Fund", house: "Kotak MF", category: "Mid Cap", risk: "High", return1y: 31.4, return5y: 19.8, minSip: 500, aum: "₹48,350 Cr", rating: 4, nav: 143.72, schemeCode: "120255" },
  { name: "Nippon India Liquid Fund", house: "Nippon MF", category: "Liquid", risk: "Low", return1y: 7.2, return5y: 6.8, minSip: 500, aum: "₹19,821 Cr", rating: 4, nav: 5412.34, schemeCode: "118701" },
  { name: "HDFC Flexi Cap Fund", house: "HDFC MF", category: "Flexi Cap", risk: "Medium", return1y: 24.1, return5y: 17.3, minSip: 500, aum: "₹55,420 Cr", rating: 5, nav: 1821.56, schemeCode: "100016" },
  { name: "Axis Small Cap Fund", house: "Axis MF", category: "Small Cap", risk: "High", return1y: 26.8, return5y: 21.2, minSip: 500, aum: "₹21,340 Cr", rating: 4, nav: 92.14, schemeCode: "125354" },
  { name: "ICICI Prudential Technology Fund", house: "ICICI Prudential", category: "Sectoral", risk: "High", return1y: 19.4, return5y: 24.8, minSip: 100, aum: "₹12,450 Cr", rating: 4, nav: 218.63, schemeCode: "120465" },
];

const CATEGORIES = ["All", "Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "Hybrid", "ELSS", "Sectoral", "Liquid"];

const RISK_COLORS: Record<string, string> = {
  Low: "text-green-success",
  Medium: "text-yellow-warn",
  High: "text-red-danger",
};

const MF_INVEST_LINKS = [
  { name: "Groww", url: "https://groww.in", color: "#00d09c", icon: "🌱" },
  { name: "Zerodha Coin", url: "https://zerodha.com", color: "#387ed1", icon: "⚡" },
];

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
      {/* Invest Platforms Banner */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 border border-primary/20"
      >
        <p className="text-xs font-semibold text-muted-foreground mb-3">🚀 Start SIP on SEBI-registered platforms:</p>
        <div className="flex flex-wrap gap-3">
          {MF_INVEST_LINKS.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:shadow-md"
              style={{ background: `${p.color}18`, color: p.color, border: `1.5px solid ${p.color}40` }}
            >
              <span>{p.icon}</span>
              {p.name}
              <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </motion.div>

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
              <th className="pb-3 font-semibold text-right">NAV</th>
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
                  <span className={`text-xs font-semibold ${RISK_COLORS[f.risk]}`}>{f.risk}</span>
                </td>
                <td className="py-3 text-right text-foreground font-mono text-xs">₹{f.nav.toFixed(2)}</td>
                <td className="py-3 text-right font-bold text-green-success">+{f.return1y}%</td>
                <td className="py-3 text-right font-bold text-primary">+{f.return5y}%</td>
                <td className="py-3 text-right text-foreground font-medium">₹{f.minSip}</td>
                <td className="py-3 text-right text-muted-foreground text-xs">{f.aum}</td>
                <td className="py-3 text-center"><Stars n={f.rating} /></td>
                <td className="py-3 text-right">
                  <a
                    href="https://groww.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg gradient-primary font-semibold hover:opacity-90 transition-all inline-flex items-center gap-1"
                    style={{ color: "hsl(var(--primary-foreground))" }}
                  >
                    Invest <ExternalLink size={10} />
                  </a>
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
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">NAV</p>
                <p className="text-xs font-bold text-foreground">₹{f.nav.toFixed(0)}</p>
              </div>
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
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{f.category}</span>
                <span className={`text-xs font-semibold ${RISK_COLORS[f.risk]}`}>{f.risk} Risk</span>
              </div>
              <a
                href="https://groww.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg gradient-primary font-semibold inline-flex items-center gap-1"
                style={{ color: "hsl(var(--primary-foreground))" }}
              >
                Invest <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">* NAV and returns are indicative based on historical data. Past performance is not indicative of future results.</p>
    </div>
  );
}
