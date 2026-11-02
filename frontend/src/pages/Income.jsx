import { useEffect, useState } from "react"
import ArrowIcon from "../components/ArrowIcon"

import IncomeForm from "../components/IncomeForm"

import {
  getIncome,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../services/api"


function Income() {

  const [income, setIncome] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingIncome, setEditingIncome] = useState(null)


  const loadIncome = async () => {

    try {

      setLoading(true)
      setError("")

      const data = await getIncome()

      setIncome(data)

    } catch (err) {

      console.error(err)

      setError("Unable to load income.")

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    loadIncome()

  }, [])


  const handleAdd = () => {

    setEditingIncome(null)

    setIsModalOpen(true)

  }


  const handleEdit = (item) => {

    setEditingIncome(item)

    setIsModalOpen(true)

  }


  const handleSubmit = async (data) => {

    try {

      if (editingIncome) {

        const updated = await updateIncome(
          editingIncome.id,
          data
        )

        setIncome((previous) =>
          previous.map((item) =>
            item.id === editingIncome.id
              ? updated
              : item
          )
        )

      } else {

        const created = await addIncome(data)

        setIncome((previous) => [
          created,
          ...previous,
        ])

      }

      setIsModalOpen(false)
      setEditingIncome(null)

    } catch (err) {

      console.error(err)

      alert("Failed to save income.")

    }
  }


  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this income?"
    )

    if (!confirmed) {
      return
    }


    try {

      await deleteIncome(id)

      setIncome((previous) =>
        previous.filter((item) => item.id !== id)
      )

    } catch (err) {

      console.error(err)

      alert("Failed to delete income.")

    }
  }


  const formatCurrency = (amount) => {

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount || 0)

  }


  return (
    <div className="page">

      <div className="page-header-row">

        <div>

          <h1>Income</h1>

          <p>
            Track your earnings and income sources.
          </p>

        </div>


        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          + Add Income
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

            <h2>Income History</h2>

            <p>
              {income.length} transaction
              {income.length !== 1 ? "s" : ""}
            </p>

          </div>

        </div>


        {loading ? (

          <div className="empty-state">
            <div className="loading-spinner"></div>
            <p>Loading income...</p>
          </div>

        ) : income.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon"><ArrowIcon direction="up" /></div>

            <h3>No income recorded</h3>

            <p>
              Add your salary or other income sources
              to start tracking.
            </p>

            <button
              className="btn btn-primary"
              onClick={handleAdd}
            >
              + Add Income
            </button>

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>
                  <th>Date</th>
                  <th>Source</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>

              </thead>


              <tbody>

                {income.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.date}
                    </td>

                    <td>
                      <span className="badge income-badge">
                        {item.source}
                      </span>
                    </td>

                    <td>
                      <span className="description-cell">
                        {item.description || "—"}
                      </span>
                    </td>

                    <td className="amount income-amount">
                      + {formatCurrency(item.amount)}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="icon-btn"
                          title="Edit"
                          onClick={() =>
                            handleEdit(item)
                          }
                        >
                          ✎
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          title="Delete"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                        >
                          🗑
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      <IncomeForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingIncome(null)
        }}
        onSubmit={handleSubmit}
        editingIncome={editingIncome}
      />

    </div>
  )
}

export default Income