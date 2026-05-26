export default function Header({ activeTab, setActiveTab, onAdd, onSignOut, userEmail }) {
  const tabs = ["overview", "transactions", "analytics"]
  return (
    <div className="border-b border-border px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black font-bold text-sm">₿</div>
            <span className="font-bold text-base tracking-tight">finflow</span>
            <span className="text-muted text-xs hidden sm:block">personal finance</span>
          </div>
          <nav className="hidden sm:flex gap-1">
            {tabs.map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                  activeTab === t ? "bg-card text-text border border-border" : "text-muted hover:text-text"
                }`}>{t}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-muted text-xs hidden md:block truncate max-w-[140px]">{userEmail}</span>
            <button onClick={onAdd} className="px-3 sm:px-4 py-1.5 rounded-lg bg-accent text-black text-sm font-semibold hover:opacity-90 transition-opacity">+ Añadir</button>
            <button onClick={onSignOut} className="text-muted text-xs hover:text-text transition-colors">Salir</button>
          </div>
        </div>
        <nav className="flex sm:hidden gap-1 pb-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                activeTab === t ? "bg-card text-text border border-border" : "text-muted hover:text-text"
              }`}>{t}</button>
          ))}
        </nav>
      </div>
    </div>
  )
}
