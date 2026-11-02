import { useEffect, useMemo, useState } from "react"
import AuthContext from "./AuthContext"
import {
  ApiError,
  getCurrentUser,
  login as signIn,
  logout as signOut,
  register as createAccount,
} from "../services/api"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState("")

  useEffect(() => {
    let active = true

    getCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser)
      })
      .catch((error) => {
        if (!active) return
        if (!(error instanceof ApiError) || error.status !== 401) {
          setAuthError("Unable to verify your sign-in. Please refresh and try again.")
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    authError,
    signIn: async (credentials) => {
      const signedInUser = await signIn(credentials)
      setUser(signedInUser)
      setAuthError("")
      return signedInUser
    },
    createAccount: async (credentials) => {
      await createAccount(credentials)
      const signedInUser = await signIn(credentials)
      setUser(signedInUser)
      setAuthError("")
      return signedInUser
    },
    signOut: async () => {
      await signOut()
      setUser(null)
    },
  }), [user, loading, authError])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
