import { useState } from "react";
import { motion } from "framer-motion";
import { UserData } from "@/types/finance";
import { FinancialSummary } from "@/components/FinancialSummary";
import { AIInvestmentAdvisor } from "@/components/AIInvestmentAdvisor";
import { ChartsSection } from "@/components/ChartsSection";
import { GoalsAndTips } from "@/components/GoalsAndTips";
import { AIChatbot } from "@/components/AIChatbot";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MarketData } from "@/components/MarketData";
import { FeedbackPage } from "@/components/FeedbackPage";
import { Sparkles, LogOut, LayoutDashboard, TrendingUp, Target, BarChart2, MessageSquareHeart } from "lucide-react";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "invest", label: "AI Advisor", icon: TrendingUp },
  { id: "markets", label: "Markets", icon: BarChart2 },
  { id: "goals", label: "Goals & Tips", icon: Target },
  { id: "feedback", label: "Feedback", icon: MessageSquareHeart },
];

interface Props {
  userData: UserData;
  onLogout: () => void;
}

export function Dashboard({ userData, onLogout }: Props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <nav className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles size={16} style={{ color: "hsl(var(--primary-foreground))" }} />
            </div>
            <span className="font-black text-foreground">SmartSave<span className="text-primary"> AI</span></span>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-secondary rounded-xl p-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === tab.id ? "gradient-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                style={activeTab === tab.id ? { color: "hsl(var(--primary-foreground))" } : {}}
              >
                <tab.icon size={13} /> {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-foreground">{userData.username}</span>
              <span className="text-xs text-muted-foreground capitalize">{userData.riskLevel} risk</span>
            </div>
            <ThemeToggle />
            <button onClick={onLogout} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex md:hidden items-center gap-1 bg-secondary mx-4 mb-3 rounded-xl p-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg text-xs transition-all ${activeTab === tab.id ? "gradient-primary" : "text-muted-foreground"}`}
              style={activeTab === tab.id ? { color: "hsl(var(--primary-foreground))" } : {}}
            >
              <tab.icon size={14} />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <>
              <FinancialSummary userData={userData} />
              <div className="mt-8">
                <ChartsSection userData={userData} />
              </div>
            </>
          )}
          {activeTab === "invest" && <AIInvestmentAdvisor userData={userData} />}
          {activeTab === "markets" && <MarketData userData={userData} />}
          {activeTab === "banks" && <BankOptions />}
          {activeTab === "goals" && <GoalsAndTips userData={userData} />}
        </motion.div>
      </main>

      <AIChatbot userData={userData} />
    </div>
  );
}
