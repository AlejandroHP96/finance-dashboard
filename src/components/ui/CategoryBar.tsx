import { fmt } from "../../utils/formatters"

interface CategoryBarProps {
  name: string
  value: number
  total: number
  color: string
}

const CategoryBar = ({ name, value, total, color }: CategoryBarProps) => {
  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-text">{name}</span>
        <span className="text-sm font-mono text-muted">{fmt(value)} · {pct}%</span>
      </div>
      <div className="h-1.5 bg-surface rounded-full">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default CategoryBar
