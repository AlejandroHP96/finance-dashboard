import { fmt } from "../../utils/formatters"

interface PayloadEntry {
  color: string
  name: string
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: PayloadEntry[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 text-sm">
      <p className="text-muted font-mono mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="my-0.5">{p.name}: {fmt(p.value)}</p>
      ))}
    </div>
  )
}

export default CustomTooltip
