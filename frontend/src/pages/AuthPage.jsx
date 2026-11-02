import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ApiError } from "../services/api"
import { useAuth } from "../context/useAuth"
import ArrowIcon from "../components/ArrowIcon"

function AuthPage({ mode }) {
  const isRegister = mode === "register"
  const { user, loading, signIn, createAccount } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      const credentials = { email: email.trim(), password }
      if (isRegister) {
        await createAccount(credentials)
      } else {
        await signIn(credentials)
      }

      const returnTo = location.state?.from?.pathname ?? "/dashboard"
      navigate(returnTo, { replace: true })
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 409) {
        setError("An account with this email already exists. Try signing in instead.")
      } else if (requestError instanceof ApiError && requestError.status === 401) {
        setError("That email and password combination did not match.")
      } else if (requestError instanceof ApiError && requestError.status === 400) {
        setError(isRegister
          ? "Enter a valid email and a password of at least 12 characters."
          : "Enter a valid email and password.")
      } else {
        setError("We couldn't complete your request. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-side">
        <Link className="landing-brand auth-brand" to="/">
          <span className="landing-brand-icon" aria-hidden="true">₹</span>
          <span>Personal Finance Manager</span>
        </Link>
        <div className="auth-side-content">
          <span className="section-kicker">A CLEARER VIEW OF YOUR MONEY</span>
          <h1>Small steps.<br /><span>Stronger footing.</span></h1>
          <p>Keep your financial essentials together and make your next move with more confidence.</p>
          <div className="auth-side-art" aria-hidden="true">
            <span className="auth-art-orbit" />
            <span className="auth-art-tile">₹</span>
            <span className="auth-art-sparkle">✳</span>
          </div>
        </div>
        <span className="auth-side-footer">Your finances belong to you.</span>
      </div>

      <div className="auth-main">
        <div className="auth-form-wrap">
          <Link className="auth-back-link" to="/">
            <ArrowIcon direction="left" />
            Back to home
          </Link>
          <p className="section-kicker">{isRegister ? "GET STARTED" : "WELCOME BACK"}</p>
          <h2>{isRegister ? "Create your account" : "Sign in to your account"}</h2>
          <p className="auth-intro">
            {isRegister
              ? "Your own private space to keep track of your finances."
              : "Sign in to pick up where you left off."}
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="auth-email">Email address</label>
            <input
              autoComplete="email"
              id="auth-email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
              maxLength={254}
            />
            <div className="auth-password-label">
              <label htmlFor="auth-password">Password</label>
              {!isRegister && <span>Private and encrypted</span>}
            </div>
            <input
              autoComplete={isRegister ? "new-password" : "current-password"}
              id="auth-password"
              maxLength={72}
              minLength={isRegister ? 12 : undefined}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isRegister ? "At least 12 characters" : "Enter your password"}
              required
              type="password"
              value={password}
            />
            {isRegister && (
              <p className="auth-field-hint">Use at least 12 characters for a stronger password.</p>
            )}
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth-submit" disabled={submitting} type="submit">
              {submitting
                ? (isRegister ? "Creating account..." : "Signing in...")
                : (isRegister ? "Create account" : "Sign in")}
              {!submitting && <ArrowIcon />}
            </button>
          </form>

          <p className="auth-switch">
            {isRegister ? "Already have an account?" : "New to Personal Finance Manager?"}{" "}
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? "Sign in" : "Create an account"}
            </Link>
          </p>
          <p className="auth-security-note"><span aria-hidden="true">✓</span> Your finance data is private to your account.</p>
        </div>
      </div>
    </main>
  )
}

export default AuthPage
