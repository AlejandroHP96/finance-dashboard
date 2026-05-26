import { useState, useEffect } from "react"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth"
import { auth } from "../lib/firebase"

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signUp = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (e) {
      return { error: e }
    }
  }

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (e) {
      return { error: e }
    }
  }

  const signOut = () => firebaseSignOut(auth)

  return { user, loading, signUp, signIn, signOut }
}
