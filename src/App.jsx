import { useState } from "react"
import { useAuth } from "./hooks/useAuth"
import { useTransactions } from "./hooks/useTransactions"
import Header from "./components/layout/Header"
import AddTransactionModal from "./components/transactions/AddTransactionModal"
import Overview from "./pages/Overview"
import Transactions from "./pages/Transactions"
import Analytics from "./pages/Analytics"
import AuthPage from "./pages/AuthPage"

export default function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth()
  const { transactions, loading: txLoading, addTransaction, deleteTransaction, totals } = useTransactions(user?.uid)
  const [activeTab, setActiveTab] = useState("overview")
  const [showModal, setShowModal] = useState(false)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-muted text-sm">Cargando...</p>
      </div>
    )
  }

  if (!user) return <AuthPage onSignIn={signIn} onSignUp={signUp} />

  const pages = {
    overview:     <Overview     transactions={transactions} totals={totals} />,
    transactions: <Transactions transactions={transactions} onDelete={deleteTransaction} />,
    analytics:    <Analytics    transactions={transactions} totals={totals} />,
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAdd={() => setShowModal(true)}
        onSignOut={signOut}
        userEmail={user.email}
      />
      <main className="max-w-5xl mx-auto px-8 py-8">
        {txLoading
          ? <p className="text-muted text-sm">Cargando transacciones...</p>
          : pages[activeTab]
        }
      </main>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} onAdd={addTransaction} />}
    </div>
  )
}
