export type TransactionType = "income" | "expense"

export interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  type: TransactionType
  date: string
  userId: string
  createdAt?: unknown
}

export interface NewTransaction {
  description: string
  amount: number
  category: string
  type: TransactionType
  date: string
}

export interface Totals {
  income: number
  expense: number
  balance: number
  savingsRate: string
}

export interface MonthlyData {
  label: string
  income: number
  expense: number
  savings: number
}

export interface CategoryData {
  name: string
  value: number
}

export interface AuthResult {
  error: Error | null
}
