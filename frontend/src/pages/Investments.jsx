import { useEffect, useState } from "react"

import InvestmentForm from "../components/InvestmentForm"

import {
  getInvestments,
  addInvestment,
  updateInvestment,
  deleteInvestment,
} from "../services/api"


function Investments() {

  const [investments, setInvestments] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingInvestment, setEditingInvestment] =
    useState(null)


  const loadInvestments = async () => {

    try {

      setLoading(true)
      setError("")

      const data = await getInvestments()

      setInvestments(data)

    } catch (err) {

      console.error(err)

      setError("Unable to load investments.")

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    loadInvestments()

  }, [])


  const handleAdd = () => {

    setEditingInvestment(null)

    setIsModalOpen(true)

  }


  const handleEdit = (investment) => {

    setEditingInvestment(investment)

    setIsModalOpen(true)

  }


  const handleSubmit = async (data) => {

    try {

      if (editingInvestment) {

        const updated = await updateInvestment(
          editingInvestment.id,
          data
        )

        setInvestments((previous) =>
          previous.map((item) =>
            item.id === editingInvestment.id
              ? updated
              : item
          )
        )

      } else {

        const created = await addInvestment(data)

        setInvestments((previous) => [
          created,
          ...previous,
        ])

      }

      setIsModalOpen(false)
      setEditingInvestment(null)

    } catch (err) {

      console.error(err)

      alert("Failed to save investment.")

    }
  }


  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this investment?"
    )

    if (!confirmed) {
      return
    }


    try {

      await deleteInvestment(id)

      setInvestments((previous) =>
        previous.filter((item) => item.id !== id)
      )

    } catch (err) {

      console.error(err)

      alert("Failed to delete investment.")

    }
  }


  const formatCurrency = (amount) => {

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0)

  }


  const calculateProfit = (investment) => {

    return (
      Number(investment.currentValue || 0) -
      Number(investment.amountInvested || 0)
    )

  }


  return (
    <div className="page">

      <div className="page-header-row">

        <div>

          <h1>Investments</h1>

          <p>
            Track your investments and portfolio value.
          </p>

        </div>


        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          + Add Investment
        </button>

      </div>


      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      <div className="content-card">

        <div className="card-header">

          <div>

            <h2>Investment Portfolio</h2>

            <p>
              {investments.length} investment
              {investments.length !== 1 ? "s" : ""}
            </p>

          </div>

        </div>


        {loading ? (

          <div className="empty-state">

            <div className="loading-spinner"></div>

            <p>Loading investments...</p>

          </div>

        ) : investments.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">◆</div>

            <h3>No investments yet</h3>

            <p>
              Start building your portfolio by adding
              an investment.
            </p>

            <button
              className="btn btn-primary"
              onClick={handleAdd}
            >
              + Add Investment
            </button>

          </div>

        ) : (

          <div className="table-wrapper">

            <table className="investment-table">

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Invested</th>
                  <th>Current Value</th>
                  <th>Profit / Loss</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {investments.map((investment) => {

                  const profit =
                    calculateProfit(investment)

                  return (

                    <tr key={investment.id}>

                      <td>
                        <strong>
                          {investment.name}
                        </strong>
                      </td>

                      <td>
                        <span className="badge">
                          {investment.type}
                        </span>
                      </td>

                      <td className="amount">
                        {formatCurrency(
                          investment.amountInvested
                        )}
                      </td>

                      <td className="amount">
                        {formatCurrency(
                          investment.currentValue
                        )}
                      </td>

                      <td
                        className={
                          profit >= 0
                            ? "profit-positive"
                            : "profit-negative"
                        }
                      >
                        {profit >= 0 ? "+" : ""}
                        {formatCurrency(profit)}
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            investment.status
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")
                          }`}
                        >
                          {investment.status}
                        </span>

                      </td>

                      <td>

                        <div className="action-buttons">

                          <button
                            className="icon-btn"
                            title="Edit"
                            onClick={() =>
                              handleEdit(investment)
                            }
                          >
                            ✎
                          </button>

                          <button
                            className="icon-btn delete-btn"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                investment.id
                              )
                            }
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>


      <InvestmentForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingInvestment(null)
        }}
        onSubmit={handleSubmit}
        editingInvestment={editingInvestment}
      />

    </div>
  )
}

export default Investments