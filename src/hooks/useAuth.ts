import { useState, useEffect } from "react"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth"
import { auth } from "../lib/firebase"
import type { AuthResult } from "../types"

export const useAuth = () => {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const signUp = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (e) {
      return { error: e as Error }
    }
  }

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (e) {
      return { error: e as Error }
    }
  }

  const signOut = () => firebaseSignOut(auth)

  return { user, loading, signUp, signIn, signOut }
}
