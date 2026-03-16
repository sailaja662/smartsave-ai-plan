import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GOLD_ETFS = [
  { name: "SBI Gold ETF", type: "ETF", price: 5842, change: 0.32, return1y: 14.2, return3y: 11.8, expense: "0.50%", exchange: "NSE/BSE", minQty: "1 unit", house: "SBI MF" },
  { name: "HDFC Gold ETF", type: "ETF", price: 5891, change: 0.28, return1y: 14.5, return3y: 12.1, expense: "0.59%", exchange: "NSE/BSE", minQty: "1 unit", house: "HDFC MF" },
  { name: "ICICI Prudential Gold ETF", type: "ETF", price: 5863, change: 0.31, return1y: 14.1, return3y: 11.9, expense: "0.50%", exchange: "NSE/BSE", minQty: "1 unit", house: "ICICI Prudential" },
  { name: "Nippon India Gold BeES", type: "ETF", price: 5678, change: 0.29, return1y: 14.0, return3y: 11.6, expense: "0.82%", exchange: "NSE", minQty: "1 unit", house: "Nippon MF" },
  { name: "Kotak Gold ETF", type: "ETF", price: 5720, change: 0.33, return1y: 14.3, return3y: 11.7, expense: "0.55%", exchange: "NSE/BSE", minQty: "1 unit", house: "Kotak MF" },
  { name: "Axis Gold ETF", type: "ETF", price: 5848, change: 0.30, return1y: 14.2, return3y: 11.8, expense: "0.53%", exchange: "NSE/BSE", minQty: "1 unit", house: "Axis MF" },
  { name: "SBI Gold Fund (FoF)", type: "Fund", price: 23.41, change: 0.27, return1y: 13.9, return3y: 11.4, expense: "0.65%", exchange: "Direct/Regular", minQty: "₹500 SIP", house: "SBI MF" },
  { name: "HDFC Gold Fund (FoF)", type: "Fund", price: 24.12, change: 0.26, return1y: 14.1, return3y: 11.7, expense: "0.59%", exchange: "Direct/Regular", minQty: "₹500 SIP", house: "HDFC MF" },
  { name: "Sovereign Gold Bond (SGB) 2025", type: "SGB", price: 9142, change: 0.34, return1y: 14.8, return3y: 12.4, expense: "Nil", exchange: "NSE/BSE", minQty: "1 gram", house: "RBI Issued" },
];

const GOLD_INVEST_LINKS = [
  { name: "Paytm Digital Gold", url: "https://paytm.com/digital-gold", color: "#00b9f1", icon: "💙" },
  { name: "PhonePe Gold", url: "https://www.phonepe.com/gold", color: "#6739b7", icon: "💜" },
  { name: "Groww Gold ETF", url: "https://groww.in", color: "#00d09c", icon: "🌱" },
];

const TYPE_CONFIG: Record<string, { color: string; bg: string }> = {
  ETF: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Fund: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  SGB: { color: "#22d3ee", bg: "rgba(34,211,238,0.12)" },
};

export function GoldETF() {
  return (
    <div className="flex flex-col gap-5">
      {/* Gold Price Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, hsl(45,90%,52%), hsl(35,90%,48%))" }}
      >
        <div>
          <p className="text-xs font-semibold opacity-80" style={{ color: "hsl(var(--primary-foreground))" }}>🪙 24K Gold (MCX Spot)</p>
          <p className="text-3xl font-black" style={{ color: "hsl(var(--primary-foreground))" }}>₹73,450 <span className="text-base font-semibold opacity-80">/ 10g</span></p>
          <p className="text-xs mt-1 opacity-80" style={{ color: "hsl(var(--primary-foreground))" }}>+₹234 (+0.32%) today</p>
          <p className="text-xs mt-1 font-semibold opacity-90" style={{ color: "hsl(var(--primary-foreground))" }}>💡 Gold is a stable long-term investment — ideal as 10–20% of your portfolio.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[{ label: "1Y Return", val: "+14.2%" }, { label: "3Y Return", val: "+11.8%" }, { label: "5Y Return", val: "+13.5%" }].map(({ label, val }) => (
            <div key={label}>
              <p className="text-xs opacity-75" style={{ color: "hsl(var(--primary-foreground))" }}>{label}</p>
              <p className="text-base font-bold" style={{ color: "hsl(var(--primary-foreground))" }}>{val}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Why Invest in Gold */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: "🛡️", title: "Inflation Hedge", desc: "Gold protects purchasing power during inflation" },
          { icon: "📉", title: "Low Correlation", desc: "Moves independently of stocks and bonds" },
          { icon: "💧", title: "High Liquidity", desc: "ETFs can be sold instantly on stock exchange" },
        ].map(item => (
          <div key={item.title} className="glass-card p-4 flex items-start gap-3">
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="text-xs font-bold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invest in Gold - Official Platforms */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 border border-yellow-warn/20"
      >
        <p className="text-xs font-semibold text-muted-foreground mb-3">🪙 Buy Digital Gold & Gold ETFs on official platforms:</p>
        <div className="flex flex-wrap gap-3">
          {GOLD_INVEST_LINKS.map(p => (
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

      {/* ETF Table Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="pb-3 font-semibold">Fund Name</th>
              <th className="pb-3 font-semibold">Type</th>
              <th className="pb-3 font-semibold text-right">Price</th>
              <th className="pb-3 font-semibold text-right">Today</th>
              <th className="pb-3 font-semibold text-right">1Y Return</th>
              <th className="pb-3 font-semibold text-right">3Y Return</th>
              <th className="pb-3 font-semibold text-right">Expense</th>
              <th className="pb-3 font-semibold text-right">Min. Buy</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {GOLD_ETFS.map((g, i) => (
              <motion.tr
                key={g.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-3">
                  <p className="font-semibold text-foreground">{g.name}</p>
                  <p className="text-xs text-muted-foreground">{g.house} • {g.exchange}</p>
                </td>
                <td className="py-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: TYPE_CONFIG[g.type].bg, color: TYPE_CONFIG[g.type].color }}>{g.type}</span>
                </td>
                <td className="py-3 text-right font-bold text-foreground">₹{g.price.toLocaleString('en-IN')}</td>
                <td className="py-3 text-right font-semibold text-green-success">+{g.change}%</td>
                <td className="py-3 text-right font-bold text-green-success">+{g.return1y}%</td>
                <td className="py-3 text-right text-primary font-semibold">+{g.return3y}%</td>
                <td className="py-3 text-right text-muted-foreground">{g.expense}</td>
                <td className="py-3 text-right text-muted-foreground text-xs">{g.minQty}</td>
                <td className="py-3 text-right">
                  <a
                    href="https://groww.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg font-semibold hover:opacity-90 transition-all inline-flex items-center gap-1"
                    style={{ background: "hsl(var(--gold, 45 90% 52%))", color: "#fff" }}
                  >
                    Buy <ExternalLink size={10} />
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3">
        {GOLD_ETFS.map((g, i) => (
          <motion.div key={g.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold text-sm text-foreground">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.house}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: TYPE_CONFIG[g.type].bg, color: TYPE_CONFIG[g.type].color }}>{g.type}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Price</p>
                <p className="text-sm font-bold text-foreground">₹{g.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">1Y Return</p>
                <p className="text-sm font-bold text-green-success">+{g.return1y}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground">Expense</p>
                <p className="text-sm font-bold text-foreground">{g.expense}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Min: {g.minQty}</p>
              <a
                href="https://groww.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-lg font-semibold inline-flex items-center gap-1"
                style={{ background: "hsl(45, 90%, 52%)", color: "#fff" }}
              >
                Buy <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">* ETF prices are indicative. Gold prices fluctuate based on MCX spot rates.</p>
    </div>
  );
}
