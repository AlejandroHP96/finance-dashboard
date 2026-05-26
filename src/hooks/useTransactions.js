import { useState, useEffect } from "react"
import {
  collection, query, where,
  onSnapshot, addDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore"
import { db } from "../lib/firebase"

export function useTransactions(userId) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)

  useEffect(() => {
    if (!userId) return

    // Sin orderBy para evitar requerir índice compuesto en Firestore
    // El orden se gestiona en el cliente
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId)
    )

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      setTransactions(data)
      setLoading(false)
    }, (err) => {
      setError(err.message)
      setLoading(false)
    })

    return () => unsub()
  }, [userId])

  const addTransaction = async (tx) => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...tx,
        userId,
        createdAt: serverTimestamp(),
      })
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id))
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  const totals = transactions.reduce(
    (acc, t) => {
      if (t.type === "income")  acc.income  += Number(t.amount)
      if (t.type === "expense") acc.expense += Math.abs(Number(t.amount))
      return acc
    },
    { income: 0, expense: 0 }
  )

  totals.balance     = totals.income - totals.expense
  totals.savingsRate = totals.income > 0
    ? ((totals.balance / totals.income) * 100).toFixed(1)
    : "0.0"

  return { transactions, loading, error, addTransaction, deleteTransaction, totals }
}
