import type { Transaction, MonthlyData, CategoryData } from "../types"

export const fmt = (n: number): string =>
  new Intl.NumberFormat("es-ES", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(n)

export const fmtDec = (n: number): string =>
  new Intl.NumberFormat("es-ES", {
    style: "currency", currency: "EUR",
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(n)

export const buildMonthlyData = (txs: Transaction[], months: string[]): MonthlyData[] => {
  const map: Record<string, MonthlyData> = {}
  txs.forEach((t) => {
    const d     = new Date(t.date)
    const key   = `${d.getFullYear()}-${d.getMonth()}`
    const label = months[d.getMonth()]
    if (!map[key]) map[key] = { label, income: 0, expense: 0, savings: 0 }
    if (t.type === "income")  map[key].income  += Number(t.amount)
    if (t.type === "expense") map[key].expense += Math.abs(Number(t.amount))
  })
  return Object.values(map).map((m) => ({ ...m, savings: m.income - m.expense }))
}

export const buildCategoryData = (txs: Transaction[]): CategoryData[] => {
  const map: Record<string, number> = {}
  txs.filter((t) => t.type === "expense").forEach((t) => {
    map[t.category] = (map[t.category] || 0) + Math.abs(Number(t.amount))
  })
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}
