import { useState, useEffect } from "react"
import {
  collection, query, where,
  onSnapshot, addDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import type { Transaction, NewTransaction, Totals } from "../types"

export const useTransactions = (userId: string | undefined) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId)
    )

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() } as Transaction))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setTransactions(data)
      setLoading(false)
    }, (err) => {
      setError(err.message)
      setLoading(false)
    })

    return () => unsub()
  }, [userId])

  const addTransaction = async (tx: NewTransaction): Promise<boolean> => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...tx,
        userId,
        createdAt: serverTimestamp(),
      })
      return true
    } catch (e) {
      setError((e as Error).message)
      return false
    }
  }

  const deleteTransaction = async (id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, "transactions", id))
      return true
    } catch (e) {
      setError((e as Error).message)
      return false
    }
  }

  const acc = transactions.reduce(
    (a, t) => {
      if (t.type === "income")  a.income  += Number(t.amount)
      if (t.type === "expense") a.expense += Math.abs(Number(t.amount))
      return a
    },
    { income: 0, expense: 0 }
  )

  const balance = acc.income - acc.expense
  const totals: Totals = {
    ...acc,
    balance,
    savingsRate: acc.income > 0
      ? ((balance / acc.income) * 100).toFixed(1)
      : "0.0",
  }

  return { transactions, loading, error, addTransaction, deleteTransaction, totals }
}
