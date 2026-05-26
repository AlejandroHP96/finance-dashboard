export default function Badge({ children }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full bg-border text-muted">
      {children}
    </span>
  )
}
