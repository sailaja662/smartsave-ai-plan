import { UserData, InvestmentAllocation, GoalInvestmentPlan } from "@/types/finance";

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

export function getGoalInvestmentPlan(
  monthlySavings: number,
  targetAmount: number,
  timeMonths: number,
  riskLevel: 'low' | 'medium' | 'high'
): GoalInvestmentPlan {
  const monthlySaving = targetAmount / timeMonths;
  const weeklySaving = monthlySaving / 4.33;

  let term: 'short' | 'medium' | 'long';
  if (timeMonths <= 3) term = 'short';
  else if (timeMonths <= 12) term = 'medium';
  else term = 'long';

  const canAfford = monthlySavings >= monthlySaving;

  let allocations: GoalInvestmentPlan['allocations'] = [];
  let explanation = '';

  if (term === 'short') {
    allocations = [
      { label: "Liquid Mutual Fund", percentage: 40, type: 'short', color: "#a78bfa", icon: "📈" },
      { label: "Recurring Deposit", percentage: 30, type: 'short', color: "#22d3ee", icon: "🏦" },
      { label: "Gold Savings", percentage: 20, type: 'short', color: "#facc15", icon: "🥇" },
      { label: "Emergency Cash", percentage: 10, type: 'short', color: "#4ade80", icon: "💵" },
    ];
    explanation = `Based on your ${timeMonths}-month goal, low-risk and liquid investments are recommended. Liquid Mutual Funds and Recurring Deposits ensure quick access to funds while earning returns.${!canAfford ? " ⚠️ Your current savings may be insufficient — consider reducing expenses to boost monthly savings." : " ✅ Your savings can comfortably support this goal."}`;
  } else if (term === 'medium') {
    if (riskLevel === 'low') {
      allocations = [
        { label: "Mutual Funds (SIP)", percentage: 35, type: 'medium', color: "#a78bfa", icon: "📈" },
        { label: "Gold Savings", percentage: 30, type: 'medium', color: "#facc15", icon: "🥇" },
        { label: "Fixed Deposit", percentage: 25, type: 'medium', color: "#22d3ee", icon: "🏦" },
        { label: "Savings Account", percentage: 10, type: 'medium', color: "#4ade80", icon: "💰" },
      ];
    } else {
      allocations = [
        { label: "Mutual Funds (SIP)", percentage: 50, type: 'medium', color: "#a78bfa", icon: "📈" },
        { label: "Gold Savings", percentage: 25, type: 'medium', color: "#facc15", icon: "🥇" },
        { label: "Stocks (Blue-chip)", percentage: 15, type: 'medium', color: "#f97316", icon: "📊" },
        { label: "Fixed Deposit", percentage: 10, type: 'medium', color: "#22d3ee", icon: "🏦" },
      ];
    }
    explanation = `For your ${timeMonths}-month goal, a balanced mix of Mutual Fund SIPs and Gold provides steady growth with moderate risk. Regular SIP contributions will compound your savings effectively.${!canAfford ? " ⚠️ Consider increasing monthly savings to stay on track." : " ✅ You're on a great track to hit this goal!"}`;
  } else {
    if (riskLevel === 'high') {
      allocations = [
        { label: "Stocks", percentage: 40, type: 'long', color: "#f97316", icon: "📊" },
        { label: "Mutual Funds (SIP)", percentage: 35, type: 'long', color: "#a78bfa", icon: "📈" },
        { label: "Gold Investment", percentage: 15, type: 'long', color: "#facc15", icon: "🥇" },
        { label: "Fixed Deposit", percentage: 10, type: 'long', color: "#22d3ee", icon: "🏦" },
      ];
    } else {
      allocations = [
        { label: "Mutual Funds (SIP)", percentage: 45, type: 'long', color: "#a78bfa", icon: "📈" },
        { label: "Fixed Deposit", percentage: 25, type: 'long', color: "#22d3ee", icon: "🏦" },
        { label: "Gold Investment", percentage: 20, type: 'long', color: "#facc15", icon: "🥇" },
        { label: "Stocks (Blue-chip)", percentage: 10, type: 'long', color: "#f97316", icon: "📊" },
      ];
    }
    explanation = `With a ${timeMonths}-month horizon, you can leverage the power of compounding through long-term Mutual Fund SIPs and equity investments. Time in the market beats timing the market!${!canAfford ? " ⚠️ Start small, increase contributions as income grows." : " ✅ Excellent position to build significant wealth!"}`;
  }

  return { allocations, explanation, monthlySaving, weeklySaving, term };
}

export function getGoalTips(monthlySavings: number, monthlySaving: number, targetAmount: number): string[] {
  const tips: string[] = [];
  const gap = monthlySaving - monthlySavings;

  if (gap > 0) {
    tips.push(`💸 You need ₹${Math.round(gap).toLocaleString('en-IN')} more per month. Try reducing dining out and subscriptions.`);
    tips.push("🔄 Consider a part-time gig or freelance work to boost income temporarily.");
  }
  tips.push("📅 Set up an auto-debit on salary day so savings happen before spending.");
  tips.push("📉 Review and cancel unused subscriptions — even ₹500/month adds up to ₹6,000/year.");
  tips.push("🎯 Split your goal into weekly milestones to stay motivated and track progress easily.");
  if (targetAmount > 50000) {
    tips.push("🏦 Open a dedicated savings account for this goal to avoid mixing funds.");
  }
  return tips.slice(0, 4);
}
