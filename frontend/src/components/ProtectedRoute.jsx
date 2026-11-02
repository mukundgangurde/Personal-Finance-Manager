import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/useAuth"

function ProtectedRoute() {
  const { user, loading, authError } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="auth-loading" role="status">
        <span className="loading-spinner" />
        <span>Checking your secure session...</span>
      </div>
    )
  }

  if (authError) {
    return <div className="auth-load-error" role="alert">{authError}</div>
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
