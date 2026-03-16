import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const FD_DATA = [
  {
    bank: "SBI", logo: "🏛️", color: "#2563eb", url: "https://sbi.co.in",
    bestRate: "7.10%", seniorRate: "7.60%",
    rates: [
      { tenure: "7–45 days", general: "3.50%", senior: "4.00%" },
      { tenure: "46–179 days", general: "5.50%", senior: "6.00%" },
      { tenure: "180–364 days", general: "6.25%", senior: "6.75%" },
      { tenure: "1–2 years", general: "6.80%", senior: "7.30%" },
      { tenure: "2–3 years", general: "7.00%", senior: "7.50%" },
      { tenure: "3–5 years", general: "6.75%", senior: "7.25%" },
      { tenure: "5–10 years", general: "6.50%", senior: "7.50%" },
    ],
  },
  {
    bank: "HDFC Bank", logo: "🔵", color: "#22d3ee", url: "https://hdfcbank.com",
    bestRate: "7.25%", seniorRate: "7.75%",
    rates: [
      { tenure: "7–14 days", general: "3.00%", senior: "3.50%" },
      { tenure: "30–90 days", general: "4.50%", senior: "5.00%" },
      { tenure: "91–180 days", general: "4.50%", senior: "5.00%" },
      { tenure: "6 months–1 year", general: "6.60%", senior: "7.10%" },
      { tenure: "1–2 years", general: "7.10%", senior: "7.60%" },
      { tenure: "2–3 years", general: "7.25%", senior: "7.75%" },
      { tenure: "3–5 years", general: "7.15%", senior: "7.65%" },
      { tenure: "5–10 years", general: "7.00%", senior: "7.75%" },
    ],
  },
  {
    bank: "ICICI Bank", logo: "🟠", color: "#f97316", url: "https://icicibank.com",
    bestRate: "7.20%", seniorRate: "7.70%",
    rates: [
      { tenure: "7–14 days", general: "3.00%", senior: "3.50%" },
      { tenure: "3–6 months", general: "4.75%", senior: "5.25%" },
      { tenure: "6–12 months", general: "6.60%", senior: "7.10%" },
      { tenure: "1–2 years", general: "7.00%", senior: "7.50%" },
      { tenure: "2–3 years", general: "7.20%", senior: "7.70%" },
      { tenure: "3–5 years", general: "7.10%", senior: "7.60%" },
      { tenure: "5–10 years", general: "7.00%", senior: "7.50%" },
    ],
  },
  {
    bank: "Axis Bank", logo: "🔴", color: "#ef4444", url: "https://axisbank.com",
    bestRate: "7.25%", seniorRate: "7.90%",
    rates: [
      { tenure: "7–14 days", general: "3.00%", senior: "3.50%" },
      { tenure: "3–6 months", general: "4.75%", senior: "5.25%" },
      { tenure: "6–12 months", general: "6.70%", senior: "7.20%" },
      { tenure: "1–2 years", general: "7.10%", senior: "7.75%" },
      { tenure: "2–3 years", general: "7.25%", senior: "7.90%" },
      { tenure: "3–5 years", general: "7.25%", senior: "7.90%" },
      { tenure: "5–10 years", general: "7.10%", senior: "7.75%" },
    ],
  },
  {
    bank: "Kotak Mahindra", logo: "🔶", color: "#facc15", url: "https://kotak.com",
    bestRate: "7.25%", seniorRate: "7.75%",
    rates: [
      { tenure: "7–14 days", general: "2.75%", senior: "3.25%" },
      { tenure: "3–6 months", general: "4.50%", senior: "5.00%" },
      { tenure: "6–12 months", general: "6.20%", senior: "6.70%" },
      { tenure: "1–2 years", general: "7.10%", senior: "7.60%" },
      { tenure: "2–3 years", general: "7.25%", senior: "7.75%" },
      { tenure: "3–5 years", general: "7.10%", senior: "7.60%" },
      { tenure: "5+ years", general: "6.90%", senior: "7.40%" },
    ],
  },
];

export function FixedDeposits() {
  const [selected, setSelected] = useState(FD_DATA[0].bank);
  const [isSenior, setIsSenior] = useState(false);
  const [calc, setCalc] = useState({ principal: 100000, rate: 7.0, years: 2 });

  const selectedBank = FD_DATA.find(b => b.bank === selected)!;

  const maturityCompound = calc.principal * Math.pow(1 + calc.rate / 100 / 4, 4 * calc.years);
  const interestEarned = maturityCompound - calc.principal;

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Comparison Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {FD_DATA.map((b, i) => (
          <motion.button
            key={b.bank}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(b.bank)}
            className={`glass-card p-3 text-center transition-all ${selected === b.bank ? "ring-2 ring-primary" : "hover:bg-muted/50"}`}
          >
            <span className="text-2xl">{b.logo}</span>
            <p className="text-xs font-bold text-foreground mt-1">{b.bank}</p>
            <p className="text-sm font-black" style={{ color: b.color }}>
              {isSenior ? b.seniorRate : b.bestRate}
            </p>
            <p className="text-[10px] text-muted-foreground">best rate p.a.</p>
          </motion.button>
        ))}
      </div>

      {/* Rate Table */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-bold text-foreground">{selectedBank.logo} {selectedBank.bank} — FD Rates</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Official rates from the bank's website</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsSenior(!isSenior)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${isSenior ? "border-primary gradient-primary" : "border-border bg-secondary text-muted-foreground"}`}
              style={isSenior ? { color: "hsl(var(--primary-foreground))" } : {}}
            >
              👴 Senior Citizen Rates {isSenior ? "(+0.50%)" : ""}
            </button>
            <a
              href={selectedBank.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: `${selectedBank.color}18`, color: selectedBank.color, border: `1.5px solid ${selectedBank.color}40` }}
            >
              Open FD at {selectedBank.bank} <ExternalLink size={11} />
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="pb-2 font-semibold">Tenure</th>
                <th className="pb-2 font-semibold text-right">Interest Rate</th>
                <th className="pb-2 font-semibold text-right">₹1L Maturity (est.)</th>
              </tr>
            </thead>
            <tbody>
              {selectedBank.rates.map((r, i) => {
                const rate = parseFloat(isSenior ? r.senior : r.general) / 100;
                return (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2.5 text-foreground">{r.tenure}</td>
                    <td className="py-2.5 text-right font-bold" style={{ color: selectedBank.color }}>
                      {isSenior ? r.senior : r.general}
                    </td>
                    <td className="py-2.5 text-right text-green-success font-semibold">
                      ₹{Math.round(100000 * (1 + rate)).toLocaleString('en-IN')}*
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3">* Approximate maturity for ₹1 Lakh principal (simple interest estimate)</p>
      </div>

      {/* Open FD Links */}
      <div className="glass-card p-4 border border-primary/20">
        <p className="text-xs font-semibold text-muted-foreground mb-3">🏦 Open an FD directly with official banks:</p>
        <div className="flex flex-wrap gap-3">
          {FD_DATA.map(b => (
            <a
              key={b.bank}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 hover:shadow-md"
              style={{ background: `${b.color}18`, color: b.color, border: `1.5px solid ${b.color}40` }}
            >
              {b.logo} Open FD at {b.bank} <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </div>

      {/* FD Calculator */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-foreground mb-4">🧮 FD Maturity Calculator</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { label: `Principal: ₹${calc.principal.toLocaleString('en-IN')}`, key: "principal" as const, min: 10000, max: 10000000, step: 10000 },
            { label: `Interest Rate: ${calc.rate}% p.a.`, key: "rate" as const, min: 3, max: 9, step: 0.25 },
            { label: `Duration: ${calc.years} year${calc.years > 1 ? "s" : ""}`, key: "years" as const, min: 1, max: 10, step: 1 },
          ].map(({ label, key, min, max, step }) => (
            <div key={key}>
              <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>{label}</span></div>
              <input type="range" min={min} max={max} step={step} value={calc[key]}
                onChange={e => setCalc(p => ({ ...p, [key]: Number(e.target.value) }))}
                className="w-full accent-primary" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <motion.div key={calc.principal} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="rounded-xl p-3 text-center bg-muted">
            <p className="text-xs text-muted-foreground">Principal</p>
            <p className="text-base font-black text-foreground">₹{calc.principal.toLocaleString('en-IN')}</p>
          </motion.div>
          <motion.div key={interestEarned} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="rounded-xl p-3 text-center bg-muted">
            <p className="text-xs text-muted-foreground">Interest Earned</p>
            <p className="text-base font-black text-green-success">₹{Math.round(interestEarned).toLocaleString('en-IN')}</p>
          </motion.div>
          <motion.div key={maturityCompound} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="rounded-xl p-3 text-center gradient-primary">
            <p className="text-xs opacity-80" style={{ color: "hsl(var(--primary-foreground))" }}>Maturity Amount</p>
            <p className="text-base font-black" style={{ color: "hsl(var(--primary-foreground))" }}>₹{Math.round(maturityCompound).toLocaleString('en-IN')}</p>
          </motion.div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">Calculated with quarterly compounding. Actual maturity may vary.</p>
      </div>
    </div>
  );
}
