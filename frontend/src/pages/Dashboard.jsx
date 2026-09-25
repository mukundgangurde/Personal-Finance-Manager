import { useEffect, useState } from "react"

import { getDashboardSummary } from "../services/api"


function Dashboard() {

  const [summary, setSummary] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true)

        const data = await getDashboardSummary()

        setSummary(data)

      } catch (err) {

        console.error(err)

        setError(
          "Unable to load dashboard data."
        )

      } finally {

        setLoading(false)

      }
    }


    loadDashboard()

  }, [])


  const formatCurrency = (amount) => {

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0)

  }


  if (loading) {

    return (
      <div className="page">

        <div className="dashboard-loading">

          <div className="loading-spinner"></div>

          <p>Loading your financial overview...</p>

        </div>

      </div>
    )

  }


  if (error) {

    return (
      <div className="page">

        <div className="error-message">
          {error}
        </div>

      </div>
    )

  }


  return (
    <div className="page">

      <div className="page-header">

        <div>

          <h1>Financial Overview</h1>

          <p>
            Here's a summary of your personal finances.
          </p>

        </div>

      </div>


      <div className="summary-grid">

        <div className="summary-card">

          <div className="summary-card-top">
            <span className="summary-label">
              Total Income
            </span>

            <span className="summary-icon income-icon">
              ↑
            </span>
          </div>

          <h2>
            {formatCurrency(summary.totalIncome)}
          </h2>

          <p className="summary-description">
            Money received
          </p>

        </div>


        <div className="summary-card">

          <div className="summary-card-top">

            <span className="summary-label">
              Total Expenses
            </span>

            <span className="summary-icon expense-icon">
              ↓
            </span>

          </div>

          <h2>
            {formatCurrency(summary.totalExpense)}
          </h2>

          <p className="summary-description">
            Money spent
          </p>

        </div>


        <div className="summary-card">

          <div className="summary-card-top">

            <span className="summary-label">
              Balance
            </span>

            <span className="summary-icon balance-icon">
              ₹
            </span>

          </div>

          <h2>
            {formatCurrency(summary.balance)}
          </h2>

          <p className="summary-description">
            Income minus expenses
          </p>

        </div>


        <div className="summary-card">

          <div className="summary-card-top">

            <span className="summary-label">
              Total Invested
            </span>

            <span className="summary-icon investment-icon">
              ◆
            </span>

          </div>

          <h2>
            {formatCurrency(summary.totalInvested)}
          </h2>

          <p className="summary-description">
            Principal invested
          </p>

        </div>

      </div>


      <div className="summary-grid secondary-grid">

        <div className="summary-card wide-card">

          <div className="summary-card-top">

            <span className="summary-label">
              Current Investment Value
            </span>

            <span className="summary-icon investment-icon">
              ◆
            </span>

          </div>

          <h2>
            {formatCurrency(
              summary.currentInvestmentValue
            )}
          </h2>

          <p className="summary-description">
            Current portfolio value
          </p>

        </div>


        <div className="summary-card wide-card">

          <div className="summary-card-top">

            <span className="summary-label">
              Investment Profit / Loss
            </span>

            <span className="summary-icon profit-icon">
              ↗
            </span>

          </div>

          <h2
            className={
              summary.investmentProfit >= 0
                ? "profit-positive"
                : "profit-negative"
            }
          >
            {summary.investmentProfit >= 0
              ? "+"
              : ""}
            {formatCurrency(
              summary.investmentProfit
            )}
          </h2>

          <p className="summary-description">
            Current value minus invested amount
          </p>

        </div>

      </div>


      <div className="dashboard-info">

        <div className="info-card">

          <div className="info-icon">
            ✓
          </div>

          <div>

            <h3>
              Stay on top of your finances
            </h3>

            <p>
              Track your income, expenses and
              investments from one place.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard