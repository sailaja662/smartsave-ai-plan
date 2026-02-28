import { UserData, InvestmentAllocation } from "@/types/finance";

export function getInvestmentAllocations(userData: UserData): InvestmentAllocation[] {
  const { savings, riskLevel } = userData;

  if (riskLevel === 'low') {
    return [
      { category: "Fixed Deposit", percentage: 45, expectedReturn: "6.5–7.5% p.a.", risk: "Low", color: "#22d3ee", icon: "🏦" },
      { category: "Gold Investment", percentage: 30, expectedReturn: "8–10% p.a.", risk: "Low", color: "#facc15", icon: "🥇" },
      { category: "Mutual Funds", percentage: 20, expectedReturn: "10–12% p.a.", risk: "Medium", color: "#a78bfa", icon: "📈" },
      { category: "Stocks", percentage: 5, expectedReturn: "12–18% p.a.", risk: "High", color: "#f97316", icon: "📊" },
    ];
  } else if (riskLevel === 'medium') {
    return [
      { category: "Mutual Funds", percentage: 40, expectedReturn: "10–14% p.a.", risk: "Medium", color: "#a78bfa", icon: "📈" },
      { category: "Fixed Deposit", percentage: 30, expectedReturn: "6.5–7.5% p.a.", risk: "Low", color: "#22d3ee", icon: "🏦" },
      { category: "Gold Investment", percentage: 20, expectedReturn: "8–10% p.a.", risk: "Low", color: "#facc15", icon: "🥇" },
      { category: "Stocks", percentage: 10, expectedReturn: "12–18% p.a.", risk: "High", color: "#f97316", icon: "📊" },
    ];
  } else {
    return [
      { category: "Stocks", percentage: 40, expectedReturn: "15–25% p.a.", risk: "High", color: "#f97316", icon: "📊" },
      { category: "Mutual Funds", percentage: 35, expectedReturn: "12–18% p.a.", risk: "Medium", color: "#a78bfa", icon: "📈" },
      { category: "Gold Investment", percentage: 15, expectedReturn: "8–10% p.a.", risk: "Low", color: "#facc15", icon: "🥇" },
      { category: "Fixed Deposit", percentage: 10, expectedReturn: "6.5–7.5% p.a.", risk: "Low", color: "#22d3ee", icon: "🏦" },
    ];
  }
}

export function calculateHealthScore(userData: UserData): number {
  const { income, expenses, savings } = userData;
  if (income === 0) return 0;

  const savingsRatio = savings / income;
  const expenseRatio = expenses / income;

  let score = 0;
  // Savings ratio (0–40 points)
  score += Math.min(savingsRatio * 200, 40);
  // Expense control (0–30 points)
  score += Math.max(30 - expenseRatio * 50, 0);
  // Remaining balance bonus (0–20 points)
  const remaining = income - expenses - savings;
  if (remaining >= 0) score += Math.min((remaining / income) * 40, 20);
  // Base score (10 points for participating)
  score += 10;

  return Math.min(Math.round(score), 100);
}

export function getHealthLabel(score: number): { label: string; color: string; bg: string } {
  if (score >= 70) return { label: "Excellent", color: "#22c55e", bg: "rgba(34,197,94,0.15)" };
  if (score >= 40) return { label: "Moderate", color: "#f59e0b", bg: "rgba(245,158,11,0.15)" };
  return { label: "Poor", color: "#ef4444", bg: "rgba(239,68,68,0.15)" };
}

export function calculateFutureValue(principal: number, ratePercent: number, years: number): number {
  return principal * Math.pow(1 + ratePercent / 100, years);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export function getAITips(userData: UserData): string[] {
  const { income, expenses, savings } = userData;
  const tips: string[] = [];
  const savingsRatio = income > 0 ? savings / income : 0;
  const expenseRatio = income > 0 ? expenses / income : 0;

  if (savingsRatio < 0.2) tips.push("💡 Try to save at least 20% of your income each month for financial security.");
  if (expenseRatio > 0.6) tips.push("✂️ Your expenses are high. Consider cutting discretionary spending like dining out or subscriptions.");
  if (savings > 0) tips.push("🚀 Set up a SIP (Systematic Investment Plan) to automate your investments.");
  tips.push("🛡️ Build an emergency fund of 3–6 months of expenses before investing aggressively.");
  if (savings > 10000) tips.push("🏠 Consider a goal-based investment plan for major purchases like a home or car.");
  tips.push("📱 Track every expense — even small amounts add up to big savings over time.");
  return tips.slice(0, 4);
}
