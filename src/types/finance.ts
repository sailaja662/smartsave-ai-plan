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
}

export interface ExpenseCategory {
  name: string;
  amount: number;
  color: string;
}
