import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts"
import KpiCard from "../components/ui/KpiCard"
import CustomTooltip from "../components/ui/CustomTooltip"
import { fmt, fmtDec, buildMonthlyData, buildCategoryData } from "../utils/formatters"
import { MONTHS, CAT_COLORS } from "../constants/categories"

export default function Overview({ transactions, totals }) {
  const monthly = buildMonthlyData(transactions, MONTHS)
  const catData = buildCategoryData(transactions)
  const recent  = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)

  const kpis = [
    { label: "Balance total",  value: fmt(totals.balance),       sub: "Acumulado",       color: totals.balance >= 0 ? "#4ade80" : "#f87171" },
    { label: "Ingresos",       value: fmt(totals.income),        sub: "Total histórico", color: "#4ade80" },
    { label: "Gastos",         value: fmt(totals.expense),       sub: "Total histórico", color: "#f87171" },
    { label: "Tasa de ahorro", value: `${totals.savingsRate}%`,  sub: "Sobre ingresos",  color: "#a78bfa" },
  ]

  return (
    <div className="fade-up space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-sm font-semibold mb-5">Evolución mensual</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthly} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f87171" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2a2a38" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#6b6b80", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b6b80", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k€`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#6b6b80" }} />
            <Area type="monotone" dataKey="income"  name="Ingresos" stroke="#4ade80" strokeWidth={2} fill="url(#gi)" dot={false} />
            <Area type="monotone" dataKey="expense" name="Gastos"   stroke="#f87171" strokeWidth={2} fill="url(#ge)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm font-semibold mb-4">Gastos por categoría</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={catData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
                  {catData.map((_, i) => <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: "#1c1c26", border: "1px solid #2a2a38", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1">
              {catData.slice(0, 5).map((c, i) => (
                <div key={i} className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm" style={{ background: CAT_COLORS[i % CAT_COLORS.length] }} />
                    <span className="text-xs text-muted">{c.name}</span>
                  </div>
                  <span className="text-xs font-mono">{fmt(c.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm font-semibold mb-4">Últimas transacciones</p>
          {recent.length === 0
            ? <p className="text-muted text-sm">Sin transacciones todavía.</p>
            : recent.map((t) => (
              <div key={t.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted">{t.category} · {t.date}</p>
                </div>
                <span className={`text-sm font-mono font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                  {t.type === "income" ? "+" : ""}{fmtDec(t.amount)}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
