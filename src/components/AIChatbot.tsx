import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { UserData } from "@/types/finance";
import { formatINR, getInvestmentAllocations, calculateHealthScore } from "@/lib/financeUtils";

interface Message { role: "user" | "bot"; text: string; }

function getBotReply(input: string, userData: UserData): string {
  const q = input.toLowerCase();
  const allocs = getInvestmentAllocations(userData);
  const score = calculateHealthScore(userData);

  if (q.includes("save") || q.includes("savings")) return `Your current monthly savings is ${formatINR(userData.savings)}. That's ${userData.income > 0 ? ((userData.savings / userData.income) * 100).toFixed(1) : 0}% of your income. Aim for 20–30% for financial security!`;
  if (q.includes("invest")) return `Based on your ${userData.riskLevel} risk profile, I recommend: ${allocs.map(a => `${a.percentage}% in ${a.category}`).join(", ")}.`;
  if (q.includes("health") || q.includes("score")) return `Your Financial Health Score is ${score}/100. ${score >= 70 ? "Excellent! Keep it up." : score >= 40 ? "Moderate. Try increasing your savings rate." : "Needs improvement. Focus on reducing expenses."}`;
  if (q.includes("fd") || q.includes("fixed deposit")) return "Fixed Deposits offer 6.5–7.5% annual returns with full capital protection. HDFC Bank and Kotak Mahindra offer the best rates currently. Great for conservative investors!";
  if (q.includes("mutual fund") || q.includes("mf")) return "Mutual Funds are managed by professionals and historically return 10–14% annually. Start a SIP with as low as ₹500/month. HDFC, ICICI, and SBI offer top-rated funds.";
  if (q.includes("gold")) return "Gold is a great hedge against inflation. You can invest via Gold ETFs, Sovereign Gold Bonds (8% returns + appreciation), or Digital Gold. Allocating 15–20% is recommended.";
  if (q.includes("stock")) return "Stocks offer high returns (15–25%) but with higher volatility. Start with blue-chip stocks like TCS, Infosys, or HDFC. Only invest money you can afford to keep for 5+ years.";
  if (q.includes("expense") || q.includes("expenses")) return `Your monthly expenses are ${formatINR(userData.expenses)}. That's ${userData.income > 0 ? ((userData.expenses / userData.income) * 100).toFixed(0) : 0}% of income. Try to keep expenses below 60% of income.`;
  if (q.includes("emergency")) return "An emergency fund should cover 3–6 months of expenses. Your target: " + formatINR(userData.expenses * 4) + ". Keep it in a liquid savings account or liquid mutual fund.";
  if (q.includes("tip") || q.includes("advice")) return "Top tips: 1) Automate your savings 2) Track every expense 3) Invest before spending 4) Review portfolio quarterly 5) Stay invested through market volatility.";
  return "I'm your AI financial advisor! Ask me about savings, investments, mutual funds, gold, stocks, fixed deposits, or your financial health score. 💰";
}

export function AIChatbot({ userData }: { userData: UserData }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Hello ${userData.username}! 👋 I'm your AI Finance Assistant. Ask me anything about investments, savings, or financial planning!` }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    const botMsg: Message = { role: "bot", text: getBotReply(input, userData) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg z-40"
        style={{ color: "hsl(var(--primary-foreground))" }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 h-[420px] glass-card flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-primary flex items-center justify-between p-4" style={{ borderRadius: "var(--radius) var(--radius) 0 0" }}>
              <div className="flex items-center gap-2" style={{ color: "hsl(var(--primary-foreground))" }}>
                <Bot size={18} />
                <span className="font-semibold text-sm">SmartSave AI Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} style={{ color: "hsl(var(--primary-foreground))" }}><X size={18} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] text-xs rounded-2xl px-3 py-2 leading-relaxed ${msg.role === "user" ? "gradient-primary" : "bg-secondary text-secondary-foreground"}`}
                    style={msg.role === "user" ? { color: "hsl(var(--primary-foreground))" } : {}}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 border-t border-border">
              <input
                className="flex-1 text-xs rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground"
                placeholder="Ask about investments..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
              />
              <button onClick={send} className="gradient-primary rounded-lg px-3 py-2" style={{ color: "hsl(var(--primary-foreground))" }}>
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
