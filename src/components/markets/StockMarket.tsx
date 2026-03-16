import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const STOCKS = [
  {
    symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", price: 2923, change: 1.24, marketCap: "₹19.8L Cr",
    pe: 28.4, high52w: 3218, low52w: 2220, growth: "High", risk: "Medium",
    about: "India's largest conglomerate with business in Oil, Retail & Telecom (Jio).",
    data: [2500, 2620, 2580, 2720, 2800, 2750, 2923],
  },
  {
    symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", price: 3842, change: 0.82, marketCap: "₹13.9L Cr",
    pe: 29.1, high52w: 4255, low52w: 3441, growth: "Moderate", risk: "Low",
    about: "World's 2nd largest IT services company with 600k+ employees.",
    data: [3500, 3580, 3620, 3700, 3750, 3800, 3842],
  },
  {
    symbol: "INFY", name: "Infosys", sector: "IT", price: 1621, change: -0.42, marketCap: "₹6.7L Cr",
    pe: 24.8, high52w: 1903, low52w: 1357, growth: "Moderate", risk: "Low",
    about: "Global IT leader in software, consulting & digital services.",
    data: [1700, 1680, 1640, 1590, 1610, 1638, 1621],
  },
  {
    symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", price: 1689, change: 1.53, marketCap: "₹12.8L Cr",
    pe: 18.2, high52w: 1880, low52w: 1363, growth: "High", risk: "Medium",
    about: "India's largest private sector bank with strong digital capabilities.",
    data: [1450, 1520, 1580, 1620, 1650, 1672, 1689],
  },
  {
    symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "NBFC", price: 6842, change: 1.82, marketCap: "₹4.1L Cr",
    pe: 32.5, high52w: 7490, low52w: 5821, growth: "High", risk: "High",
    about: "India's leading NBFC with diversified lending & EMI card business.",
    data: [5900, 6100, 6300, 6500, 6700, 6780, 6842],
  },
  {
    symbol: "PRESTIGE", name: "Prestige Estates Projects", sector: "Real Estate", price: 1432, change: 2.14, marketCap: "₹57,500 Cr",
    pe: 48.3, high52w: 1897, low52w: 880, growth: "Very High", risk: "High",
    about: "South India's premier real estate developer expanding pan-India.",
    data: [920, 1050, 1150, 1250, 1350, 1400, 1432],
  },
  {
    symbol: "WIPRO", name: "Wipro", sector: "IT", price: 527, change: -0.28, marketCap: "₹2.7L Cr",
    pe: 22.4, high52w: 581, low52w: 432, growth: "Moderate", risk: "Low",
    about: "Global IT, consulting and business process services company.",
    data: [540, 535, 530, 522, 525, 528, 527],
  },
  {
    symbol: "MARUTI", name: "Maruti Suzuki India", sector: "Auto", price: 11420, change: 0.64, marketCap: "₹3.4L Cr",
    pe: 27.8, high52w: 13680, low52w: 9590, growth: "Moderate", risk: "Medium",
    about: "India's largest passenger car manufacturer with 40%+ market share.",
    data: [10200, 10500, 10800, 11000, 11200, 11350, 11420],
  },
];

const SECTOR_COLORS: Record<string, string> = {
  IT: "#22d3ee", Energy: "#f97316", Banking: "#4ade80", NBFC: "#a78bfa",
  "Real Estate": "#facc15", Auto: "#fb7185", Pharma: "#34d399",
};

const RISK_COLORS: Record<string, string> = { Low: "green-success", Medium: "yellow-warn", High: "red-danger", "Very High": "red-danger" };

export function StockMarket() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof STOCKS[0] | null>(null);

  const filtered = STOCKS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.symbol.toLowerCase().includes(search.toLowerCase()) ||
    s.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Indices Banner */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: "NIFTY 50", value: "22,453", change: "+0.42%", up: true },
          { name: "SENSEX", value: "73,851", change: "+0.38%", up: true },
          { name: "NIFTY BANK", value: "48,210", change: "-0.12%", up: false },
        ].map(idx => (
          <motion.div key={idx.name} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="glass-card p-3 text-center">
            <p className="text-xs text-muted-foreground">{idx.name}</p>
            <p className="text-base font-black text-foreground">{idx.value}</p>
            <p className={`text-xs font-semibold ${idx.up ? "text-green-success" : "text-red-danger"}`}>{idx.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Search stocks by name, symbol or sector..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s, i) => (
          <motion.div
            key={s.symbol}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(selected?.symbol === s.symbol ? null : s)}
            className={`glass-card p-4 cursor-pointer transition-all hover:shadow-lg ${selected?.symbol === s.symbol ? "ring-2 ring-primary" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-foreground">{s.symbol}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `${SECTOR_COLORS[s.sector] || "#888"}20`, color: SECTOR_COLORS[s.sector] || "#888" }}>{s.sector}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.name}</p>
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-bold ${s.change >= 0 ? "text-green-success" : "text-red-danger"}`}>
                {s.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {s.change >= 0 ? "+" : ""}{s.change}%
              </div>
            </div>

            {/* Mini Chart */}
            <div className="h-16 mb-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s.data.map((v, idx) => ({ v, idx }))}>
                  <defs>
                    <linearGradient id={`grad-${s.symbol}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={s.change >= 0 ? "#4ade80" : "#f87171"} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={s.change >= 0 ? "#4ade80" : "#f87171"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke={s.change >= 0 ? "#4ade80" : "#f87171"} fill={`url(#grad-${s.symbol})`} strokeWidth={1.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-black text-foreground">₹{s.price.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-muted-foreground">{s.marketCap} mcap</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Risk</p>
                <p className={`text-xs font-bold text-${RISK_COLORS[s.risk]}`}>{s.risk}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Stock Detail */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 border border-primary/30"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-black text-lg text-foreground">{selected.name} <span className="text-muted-foreground text-sm">({selected.symbol})</span></h3>
              <p className="text-sm text-muted-foreground mt-1">{selected.about}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-lg font-bold">✕</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Current Price", val: `₹${selected.price.toLocaleString('en-IN')}` },
              { label: "P/E Ratio", val: selected.pe.toString() },
              { label: "52W High", val: `₹${selected.high52w.toLocaleString('en-IN')}` },
              { label: "52W Low", val: `₹${selected.low52w.toLocaleString('en-IN')}` },
              { label: "Market Cap", val: selected.marketCap },
              { label: "Sector", val: selected.sector },
              { label: "Growth Potential", val: selected.growth },
              { label: "Risk Level", val: selected.risk },
            ].map(({ label, val }) => (
              <div key={label} className="rounded-xl p-3" style={{ background: "hsl(var(--muted))" }}>
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-sm font-bold text-foreground">{val}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 py-2.5 rounded-xl text-sm font-bold gradient-primary hover:opacity-90 transition-all" style={{ color: "hsl(var(--primary-foreground))" }}>📈 Buy Now</button>
            <button className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-border text-foreground hover:bg-muted transition-all">+ Add to Watchlist</button>
          </div>
        </motion.div>
      )}

      <p className="text-xs text-muted-foreground text-center">* Prices shown are indicative. Real-time data requires exchange subscription. Invest through a registered SEBI broker.</p>
    </div>
  );
}
