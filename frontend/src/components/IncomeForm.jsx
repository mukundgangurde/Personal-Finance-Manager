import { useEffect, useState } from "react"

const emptyForm = {
  amount: "",
  source: "",
  date: "",
  description: "",
}

function IncomeForm({ isOpen, onClose, onSubmit, editingIncome }) {

  const [form, setForm] = useState(emptyForm)


  useEffect(() => {

    if (editingIncome) {

      setForm({
        amount: editingIncome.amount ?? "",
        source: editingIncome.source ?? "",
        date: editingIncome.date ?? "",
        description: editingIncome.description ?? "",
      })

    } else {

      setForm(emptyForm)

    }

  }, [editingIncome, isOpen])


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
              {editingIncome ? "Edit Income" : "Add Income"}
            </h2>

            <p>
              {editingIncome
                ? "Update your income details"
                : "Record a new income source"}
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


          <div className="form-grid">

            <div className="form-group">

              <label>Income Source</label>

              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                required
              >
                <option value="">Select source</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Business">Business</option>
                <option value="Interest">Interest</option>
                <option value="Rental">Rental</option>
                <option value="Bonus">Bonus</option>
                <option value="Other">Other</option>
              </select>

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

          </div>


          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add a note about this income"
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
              {editingIncome ? "Update Income" : "Add Income"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default IncomeForm