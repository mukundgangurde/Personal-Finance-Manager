const API_URL = "http://localhost:8080/api"

// =========================
// EXPENSE API
// =========================

export const getExpenses = async () => {
  const response = await fetch(`${API_URL}/expenses`)

  if (!response.ok) {
    throw new Error("Failed to fetch expenses")
  }

  return response.json()
}

export const addExpense = async (expense) => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })

  if (!response.ok) {
    throw new Error("Failed to add expense")
  }

  return response.json()
}

export const updateExpense = async (id, expense) => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })

  if (!response.ok) {
    throw new Error("Failed to update expense")
  }

  return response.json()
}

export const deleteExpense = async (id) => {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete expense")
  }
}


// =========================
// INCOME API
// =========================

export const getIncome = async () => {
  const response = await fetch(`${API_URL}/income`)

  if (!response.ok) {
    throw new Error("Failed to fetch income")
  }

  return response.json()
}

export const addIncome = async (income) => {
  const response = await fetch(`${API_URL}/income`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(income),
  })

  if (!response.ok) {
    throw new Error("Failed to add income")
  }

  return response.json()
}

export const updateIncome = async (id, income) => {
  const response = await fetch(`${API_URL}/income/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(income),
  })

  if (!response.ok) {
    throw new Error("Failed to update income")
  }

  return response.json()
}

export const deleteIncome = async (id) => {
  const response = await fetch(`${API_URL}/income/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete income")
  }
}


// =========================
// INVESTMENT API
// =========================

export const getInvestments = async () => {
  const response = await fetch(`${API_URL}/investments`)

  if (!response.ok) {
    throw new Error("Failed to fetch investments")
  }

  return response.json()
}

export const addInvestment = async (investment) => {
  const response = await fetch(`${API_URL}/investments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investment),
  })

  if (!response.ok) {
    throw new Error("Failed to add investment")
  }

  return response.json()
}

export const updateInvestment = async (id, investment) => {
  const response = await fetch(`${API_URL}/investments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(investment),
  })

  if (!response.ok) {
    throw new Error("Failed to update investment")
  }

  return response.json()
}

export const deleteInvestment = async (id) => {
  const response = await fetch(`${API_URL}/investments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete investment")
  }
}


// =========================
// DASHBOARD API
// =========================

export const getDashboardSummary = async () => {
  const response = await fetch(`${API_URL}/dashboard/summary`)

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary")
  }

  return response.json()
}