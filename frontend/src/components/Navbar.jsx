import { NavLink } from "react-router-dom"
import { useState } from "react"
import ArrowIcon from "./ArrowIcon"
import { useAuth } from "../context/useAuth"

function Navbar() {
  const { user, signOut } = useAuth()
  const [error, setError] = useState("")

  const handleSignOut = async () => {
    setError("")
    try {
      await signOut()
    } catch {
      setError("Unable to sign out. Please try again.")
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <NavLink to="/dashboard" className="brand">
          <div className="brand-icon">₹</div>

          <div>
            <div className="brand-title">
              Personal Finance Manager
            </div>

            <div className="brand-subtitle">
              Manage your money smarter
            </div>
          </div>
        </NavLink>


        <div className="nav-links">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>⌂</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <ArrowIcon className="nav-direction-icon" direction="down" />
            Expenses
          </NavLink>

          <NavLink
            to="/income"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <ArrowIcon className="nav-direction-icon" direction="up" />
            Income
          </NavLink>

          <NavLink
            to="/investments"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>◆</span>
            Investments
          </NavLink>

        </div>

        <div className="nav-account">
          <span className="nav-account-email">{user?.email}</span>
          <button className="nav-signout" onClick={handleSignOut} type="button">Sign out</button>
        </div>
      </div>
      {error && <span className="nav-auth-error" role="alert">{error}</span>}
    </nav>
  )
}

export default Navbar