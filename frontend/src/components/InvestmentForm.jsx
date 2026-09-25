import { useEffect, useState } from "react"

const emptyForm = {
  type: "",
  name: "",
  amountInvested: "",
  currentValue: "",
  investmentDate: "",
  maturityDate: "",
  status: "",
  description: "",
}

function InvestmentForm({
  isOpen,
  onClose,
  onSubmit,
  editingInvestment,
}) {

  const [form, setForm] = useState(emptyForm)


  useEffect(() => {

    if (editingInvestment) {

      setForm({
        type: editingInvestment.type ?? "",
        name: editingInvestment.name ?? "",
        amountInvested: editingInvestment.amountInvested ?? "",
        currentValue: editingInvestment.currentValue ?? "",
        investmentDate: editingInvestment.investmentDate ?? "",
        maturityDate: editingInvestment.maturityDate ?? "",
        status: editingInvestment.status ?? "",
        description: editingInvestment.description ?? "",
      })

    } else {

      setForm(emptyForm)

    }

  }, [editingInvestment, isOpen])


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
      amountInvested: Number(form.amountInvested),
      currentValue: Number(form.currentValue),
    })

    setForm(emptyForm)
  }


  if (!isOpen) {
    return null
  }


  return (
    <div className="modal-overlay">

      <div className="modal modal-large">

        <div className="modal-header">

          <div>
            <h2>
              {editingInvestment
                ? "Edit Investment"
                : "Add Investment"}
            </h2>

            <p>
              Track your investment and current value
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

              <label>Investment Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="Fixed Deposit">Fixed Deposit</option>
                <option value="Mutual Fund">Mutual Fund</option>
                <option value="Stocks">Stocks</option>
                <option value="Gold">Gold</option>
                <option value="PPF">PPF</option>
                <option value="NPS">NPS</option>
                <option value="Other">Other</option>
              </select>

            </div>


            <div className="form-group">

              <label>Investment Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. HDFC FD"
                required
              />

            </div>


            <div className="form-group">

              <label>Amount Invested</label>

              <div className="input-prefix">
                <span>₹</span>

                <input
                  type="number"
                  name="amountInvested"
                  value={form.amountInvested}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

            </div>


            <div className="form-group">

              <label>Current Value</label>

              <div className="input-prefix">
                <span>₹</span>

                <input
                  type="number"
                  name="currentValue"
                  value={form.currentValue}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

            </div>


            <div className="form-group">

              <label>Investment Date</label>

              <input
                type="date"
                name="investmentDate"
                value={form.investmentDate}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>Maturity Date</label>

              <input
                type="date"
                name="maturityDate"
                value={form.maturityDate}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Matured">Matured</option>
                <option value="Sold">Sold</option>
                <option value="Closed">Closed</option>
              </select>

            </div>

          </div>


          <div className="form-group">

            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add investment details"
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
              {editingInvestment
                ? "Update Investment"
                : "Add Investment"}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default InvestmentForm