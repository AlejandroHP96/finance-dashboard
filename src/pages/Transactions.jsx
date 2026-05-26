import { useState } from "react"
import TransactionRow from "../components/transactions/TransactionRow"
import { fmtDec } from "../utils/formatters"

const FILTERS = { all: "Todos", income: "Ingresos", expense: "Gastos" }

export default function Transactions({ transactions, onDelete }) {
  const [filter, setFilter] = useState("all")
  const filtered = (filter === "all" ? transactions : transactions.filter((t) => t.type === filter))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="fade-up">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <h2 className="text-xl font-bold">Transacciones</h2>
        <div className="flex gap-2">
          {Object.entries(FILTERS).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm border transition-all ${
                filter === key ? "border-accent text-accent bg-accent/10" : "border-border text-muted hover:text-text"
              }`}>{label}</button>
          ))}
        </div>
      </div>

      {/* Mobile: card list */}
      <div className="sm:hidden bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
        {filtered.length === 0
          ? <p className="px-4 py-12 text-center text-muted text-sm">No hay transacciones todavía.</p>
          : filtered.map((t) => (
            <div key={t.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.description}</p>
                <p className="text-xs text-muted mt-0.5">{t.date} · {t.category}</p>
              </div>
              <div className="flex items-center gap-3 ml-3 shrink-0">
                <span className={`text-sm font-mono font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                  {t.type === "income" ? "+" : ""}{fmtDec(t.amount)}
                </span>
                <button onClick={() => onDelete(t.id)} className="text-muted hover:text-expense text-lg leading-none transition-colors">×</button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface">
              {["Fecha","Descripción","Categoría","Importe",""].map((h, i) => (
                <th key={i} className={`px-4 py-3 text-xs text-muted font-semibold uppercase tracking-wide border-b border-border ${i === 3 ? "text-right" : "text-left"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0
              ? <tr><td colSpan={5} className="px-4 py-12 text-center text-muted text-sm">No hay transacciones todavía.</td></tr>
              : filtered.map((t, i) => <TransactionRow key={t.id} tx={t} onDelete={onDelete} isEven={i % 2 === 0} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
