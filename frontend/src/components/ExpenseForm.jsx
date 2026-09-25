import { useEffect, useState } from "react"

const emptyForm = {
  amount: "",
  category: "",
  date: "",
  description: "",
  paymentMethod: "",
}

function ExpenseForm({ isOpen, onClose, onSubmit, editingExpense }) {

  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount ?? "",
        category: editingExpense.category ?? "",
        date: editingExpense.date ?? "",
        description: editingExpense.description ?? "",
        paymentMethod: editingExpense.paymentMethod ?? "",
      })
    } else {
      setForm(emptyForm)
    }
  }, [editingExpense, isOpen])


  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    await onSubmit({
      ...form,
      amount: Number(form.amount),
    })

    setForm(emptyForm)
  }


  if (!isOpen) {
    return null
  }


  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <div>
            <h2>
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>

            <p>
              {editingExpense
                ? "Update your expense details"
                : "Record a new expense"}
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Amount</label>

              <div className="input-prefix">
                <span>₹</span>

                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>


            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>


            <div className="form-group">
              <label>Payment Method</label>

              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select payment method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

          </div>


          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What was this expense for?"
              rows="3"
            />

          </div>


          <div className="modal-actions">

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              {editingExpense ? "Update Expense" : "Add Expense"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default ExpenseForm