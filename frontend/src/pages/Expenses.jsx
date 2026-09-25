import { useEffect, useState } from "react"

import ExpenseForm from "../components/ExpenseForm"

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/api"


function Expenses() {

  const [expenses, setExpenses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editingExpense, setEditingExpense] = useState(null)


  const loadExpenses = async () => {

    try {

      setLoading(true)
      setError("")

      const data = await getExpenses()

      setExpenses(data)

    } catch (err) {

      console.error(err)

      setError("Unable to load expenses.")

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    loadExpenses()

  }, [])


  const handleAdd = () => {

    setEditingExpense(null)

    setIsModalOpen(true)

  }


  const handleEdit = (expense) => {

    setEditingExpense(expense)

    setIsModalOpen(true)

  }


  const handleSubmit = async (expense) => {

    try {

      if (editingExpense) {

        const updated = await updateExpense(
          editingExpense.id,
          expense
        )

        setExpenses((previous) =>
          previous.map((item) =>
            item.id === editingExpense.id
              ? updated
              : item
          )
        )

      } else {

        const created = await addExpense(expense)

        setExpenses((previous) => [
          created,
          ...previous,
        ])

      }

      setIsModalOpen(false)
      setEditingExpense(null)

    } catch (err) {

      console.error(err)

      alert("Failed to save expense.")

    }
  }


  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    )

    if (!confirmed) {
      return
    }


    try {

      await deleteExpense(id)

      setExpenses((previous) =>
        previous.filter((expense) => expense.id !== id)
      )

    } catch (err) {

      console.error(err)

      alert("Failed to delete expense.")

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
          <h1>Expenses</h1>

          <p>
            Track and manage your daily spending.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
        >
          + Add Expense
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
            <h2>Expense History</h2>

            <p>
              {expenses.length} transaction
              {expenses.length !== 1 ? "s" : ""}
            </p>
          </div>

        </div>


        {loading ? (

          <div className="empty-state">
            <div className="loading-spinner"></div>
            <p>Loading expenses...</p>
          </div>

        ) : expenses.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">↓</div>

            <h3>No expenses yet</h3>

            <p>
              Start tracking your spending by adding
              your first expense.
            </p>

            <button
              className="btn btn-primary"
              onClick={handleAdd}
            >
              + Add Expense
            </button>

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {expenses.map((expense) => (

                  <tr key={expense.id}>

                    <td>
                      {expense.date}
                    </td>

                    <td>
                      <span className="badge">
                        {expense.category}
                      </span>
                    </td>

                    <td>
                      <span className="description-cell">
                        {expense.description || "—"}
                      </span>
                    </td>

                    <td>
                      {expense.paymentMethod}
                    </td>

                    <td className="amount expense-amount">
                      - {formatCurrency(expense.amount)}
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="icon-btn"
                          title="Edit"
                          onClick={() =>
                            handleEdit(expense)
                          }
                        >
                          ✎
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          title="Delete"
                          onClick={() =>
                            handleDelete(expense.id)
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


      <ExpenseForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingExpense(null)
        }}
        onSubmit={handleSubmit}
        editingExpense={editingExpense}
      />

    </div>
  )
}

export default Expenses