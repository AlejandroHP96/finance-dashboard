import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
}

const Badge = ({ children }: BadgeProps) => (
  <span className="text-xs px-3 py-1 rounded-full bg-border text-muted">
    {children}
  </span>
)

export default Badge
