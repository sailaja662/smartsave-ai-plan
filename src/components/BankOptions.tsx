import { motion } from "framer-motion";

const BANKS = [
  { name: "SBI", logo: "🏛️", fd: "6.8%", mf: "✅", gold: "7.5%", color: "#2563eb", tagline: "India's Largest Bank" },
  { name: "HDFC Bank", logo: "🔵", fd: "7.1%", mf: "✅", gold: "8.0%", color: "#22d3ee", tagline: "India's Premier Private Bank" },
  { name: "ICICI Bank", logo: "🟠", fd: "7.0%", mf: "✅", gold: "7.8%", color: "#f97316", tagline: "Smart Banking Solutions" },
  { name: "Axis Bank", logo: "🔴", fd: "6.9%", mf: "✅", gold: "7.6%", color: "#ef4444", tagline: "Badhte Ka Naam" },
  { name: "Kotak Mahindra", logo: "🔶", fd: "7.2%", mf: "✅", gold: "8.1%", color: "#facc15", tagline: "Let's Make Money Simple" },
  { name: "Bank of Baroda", logo: "🟤", fd: "6.75%", mf: "✅", gold: "7.4%", color: "#a78bfa", tagline: "India's International Bank" },
];

export function BankOptions() {
  return (
    <section>
      <h2 className="section-title mb-1">🏦 Recommended Banks & Investment Options</h2>
      <p className="text-sm text-muted-foreground mb-4">AI-curated institutions based on best rates and reliability</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BANKS.map((bank, i) => (
          <motion.div
            key={bank.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{bank.logo}</div>
              <div>
                <h3 className="font-bold text-foreground">{bank.name}</h3>
                <p className="text-xs text-muted-foreground">{bank.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg p-2" style={{ background: `${bank.color}15` }}>
                <p className="text-xs text-muted-foreground">FD Rate</p>
                <p className="text-sm font-bold" style={{ color: bank.color }}>{bank.fd}</p>
              </div>
              <div className="rounded-lg p-2" style={{ background: `${bank.color}15` }}>
                <p className="text-xs text-muted-foreground">Mutual Fund</p>
                <p className="text-sm font-bold" style={{ color: bank.color }}>{bank.mf}</p>
              </div>
              <div className="rounded-lg p-2" style={{ background: `${bank.color}15` }}>
                <p className="text-xs text-muted-foreground">Gold Loan</p>
                <p className="text-sm font-bold" style={{ color: bank.color }}>{bank.gold}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ background: bank.color, color: "#fff" }}
              >
                Apply Now
              </button>
              <button
                className="flex-1 text-xs py-2 rounded-lg font-semibold border transition-all hover:bg-muted"
                style={{ borderColor: bank.color, color: bank.color }}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
