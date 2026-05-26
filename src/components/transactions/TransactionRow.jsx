import Badge from "../ui/Badge"
import { fmtDec } from "../../utils/formatters"

export default function TransactionRow({ tx, onDelete, isEven }) {
  return (
    <tr className={`border-b border-border hover:bg-card transition-colors ${isEven ? "bg-card" : "bg-surface"}`}>
      <td className="px-4 py-3 text-xs font-mono text-muted">{tx.date}</td>
      <td className="px-4 py-3 text-sm font-medium">{tx.description}</td>
      <td className="px-4 py-3"><Badge>{tx.category}</Badge></td>
      <td className={`px-4 py-3 text-sm font-mono font-semibold text-right ${tx.type === "income" ? "text-income" : "text-expense"}`}>
        {tx.type === "income" ? "+" : ""}{fmtDec(tx.amount)}
      </td>
      <td className="px-4 py-3 text-right">
        <button onClick={() => onDelete(tx.id)} className="text-muted hover:text-expense text-lg leading-none transition-colors" title="Eliminar">×</button>
      </td>
    </tr>
  )
}
