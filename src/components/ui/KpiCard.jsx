export default function KpiCard({ label, value, sub, color }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p className="text-muted text-xs mb-2">{label}</p>
      <p className="font-mono text-2xl font-bold tracking-tight" style={{ color }}>{value}</p>
      <p className="text-muted text-xs mt-1">{sub}</p>
    </div>
  )
}
