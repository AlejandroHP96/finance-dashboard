import { useState } from "react"
import { CATEGORIES } from "../../constants/categories"

const EMPTY = {
  description: "", amount: "", category: "Alimentación",
  type: "expense", date: new Date().toISOString().split("T")[0],
}

export default function AddTransactionModal({ onClose, onAdd }) {
  const [form, setForm]     = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState("")

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.description.trim() || !form.amount) {
      setErr("Descripción e importe son obligatorios."); return
    }
    setSaving(true)
    const ok = await onAdd({
      description: form.description.trim(),
      amount: form.type === "expense" ? -Math.abs(parseFloat(form.amount)) : Math.abs(parseFloat(form.amount)),
      category: form.type === "income" ? "Ingresos" : form.category,
      type: form.type,
      date: form.date,
    })
    setSaving(false)
    if (ok) onClose()
    else setErr("Error al guardar. Inténtalo de nuevo.")
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-7 w-full max-w-sm mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold">Nueva transacción</h3>
          <button onClick={onClose} className="text-muted hover:text-text text-xl leading-none">×</button>
        </div>
        <div className="flex gap-2 mb-5">
          {["expense","income"].map((t) => (
            <button key={t} onClick={() => set("type", t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all border ${
                form.type === t
                  ? t === "income" ? "bg-income text-black border-income" : "bg-expense text-black border-expense"
                  : "bg-transparent text-muted border-border"
              }`}>
              {t === "income" ? "💰 Ingreso" : "💸 Gasto"}
            </button>
          ))}
        </div>
        {[
          { label: "Descripción", key: "description", type: "text",   placeholder: "Ej: Mercadona" },
          { label: "Importe (€)", key: "amount",      type: "number", placeholder: "0.00" },
          { label: "Fecha",       key: "date",         type: "date" },
        ].map((f) => (
          <div key={f.key} className="mb-4">
            <label className="block text-xs text-muted mb-1">{f.label}</label>
            <input type={f.type} placeholder={f.placeholder} value={form[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent transition-colors" />
          </div>
        ))}
        {form.type === "expense" && (
          <div className="mb-5">
            <label className="block text-xs text-muted mb-1">Categoría</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-accent">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        )}
        {err && <p className="text-expense text-xs mb-4">{err}</p>}
        <button onClick={handleSubmit} disabled={saving}
          className={`w-full py-2.5 rounded-lg text-sm font-bold transition-opacity ${
            form.type === "income" ? "bg-income" : "bg-accent"
          } text-black ${saving ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"}`}>
          {saving ? "Guardando..." : "Añadir transacción"}
        </button>
      </div>
    </div>
  )
}
