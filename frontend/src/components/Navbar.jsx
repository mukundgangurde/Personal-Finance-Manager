import { NavLink } from "react-router-dom"

function Navbar() {
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
            <span>↓</span>
            Expenses
          </NavLink>

          <NavLink
            to="/income"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>↑</span>
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

      </div>
    </nav>
  )
}

export default Navbar