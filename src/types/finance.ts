export interface UserData {
  username: string;
  income: number;
  expenses: number;
  savings: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface InvestmentAllocation {
  category: string;
  percentage: number;
  expectedReturn: string;
  risk: 'Low' | 'Medium' | 'High';
  color: string;
  icon: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
  icon: string;
  priority: 'low' | 'medium' | 'high';
  timeMonths: number;
  startDate: string;
  category: string;
}

export interface GoalInvestmentPlan {
  allocations: { label: string; percentage: number; type: 'short' | 'medium' | 'long'; color: string; icon: string }[];
  explanation: string;
  monthlySaving: number;
  weeklySaving: number;
  term: 'short' | 'medium' | 'long';
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  color: string;
}
