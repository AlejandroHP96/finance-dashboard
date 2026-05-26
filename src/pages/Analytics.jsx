import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import CategoryBar from "../components/ui/CategoryBar"
import CustomTooltip from "../components/ui/CustomTooltip"
import { buildMonthlyData, buildCategoryData } from "../utils/formatters"
import { MONTHS, CAT_COLORS } from "../constants/categories"

export default function Analytics({ transactions, totals }) {
  const monthly = buildMonthlyData(transactions, MONTHS)
  const catData = buildCategoryData(transactions)

  return (
    <div className="fade-up space-y-6">
      <h2 className="text-xl font-bold">Analítica</h2>
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-sm font-semibold mb-5">Ahorro neto por mes</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthly} barSize={32}>
            <CartesianGrid stroke="#2a2a38" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#6b6b80", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b6b80", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}€`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="savings" name="Ahorro" radius={[6, 6, 0, 0]}>
              {monthly.map((m, i) => <Cell key={i} fill={m.savings >= 0 ? "#60a5fa" : "#f87171"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5">
        <p className="text-sm font-semibold mb-5">Desglose por categoría</p>
        {catData.length === 0
          ? <p className="text-muted text-sm">Sin datos de gastos todavía.</p>
          : catData.map((c, i) => (
            <CategoryBar key={i} name={c.name} value={c.value} total={totals.expense} color={CAT_COLORS[i % CAT_COLORS.length]} />
          ))
        }
      </div>
    </div>
  )
}
