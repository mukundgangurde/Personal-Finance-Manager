const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api"

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

const readCookie = (name) => {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : ""
}

const loadCsrfCookie = async () => {
  const response = await fetch(`${API_URL}/auth/csrf`, {
    credentials: "include",
  })

  if (!response.ok) {
    throw new ApiError("Unable to initialize a secure request.", response.status)
  }
}

const apiRequest = async (path, options = {}) => {
  const method = options.method ?? "GET"
  const headers = new Headers(options.headers)

  if (!["GET", "HEAD", "OPTIONS"].includes(method.toUpperCase())) {
    await loadCsrfCookie()
    const csrfToken = readCookie("XSRF-TOKEN")
    if (!csrfToken) {
      throw new ApiError("Unable to initialize a secure request.", 0)
    }
    headers.set("X-XSRF-TOKEN", csrfToken)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    method,
    headers,
    credentials: "include",
  })

  if (!response.ok) {
    let message = `Request failed (${response.status}).`
    try {
      const body = await response.json()
      message = body.detail ?? body.message ?? message
    } catch {
      // Some successful or error responses do not include a JSON body.
    }
    throw new ApiError(message, response.status)
  }

  if (response.status === 204) return null
  const contentType = response.headers.get("content-type") ?? ""
  return contentType.includes("application/json") ? response.json() : null
}

const jsonRequest = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

export const register = (credentials) =>
  apiRequest("/auth/register", jsonRequest("POST", credentials))

export const login = (credentials) =>
  apiRequest("/auth/login", jsonRequest("POST", credentials))

export const getCurrentUser = () => apiRequest("/auth/me")

export const logout = () => apiRequest("/auth/logout", { method: "POST" })

export const getExpenses = () => apiRequest("/expenses")

export const addExpense = (expense) =>
  apiRequest("/expenses", jsonRequest("POST", expense))

export const updateExpense = (id, expense) =>
  apiRequest(`/expenses/${id}`, jsonRequest("PUT", expense))

export const deleteExpense = (id) =>
  apiRequest(`/expenses/${id}`, { method: "DELETE" })

export const getIncome = () => apiRequest("/income")

export const addIncome = (income) =>
  apiRequest("/income", jsonRequest("POST", income))

export const updateIncome = (id, income) =>
  apiRequest(`/income/${id}`, jsonRequest("PUT", income))

export const deleteIncome = (id) =>
  apiRequest(`/income/${id}`, { method: "DELETE" })

export const getInvestments = () => apiRequest("/investments")

export const addInvestment = (investment) =>
  apiRequest("/investments", jsonRequest("POST", investment))

export const updateInvestment = (id, investment) =>
  apiRequest(`/investments/${id}`, jsonRequest("PUT", investment))

export const deleteInvestment = (id) =>
  apiRequest(`/investments/${id}`, { method: "DELETE" })

export const getDashboardSummary = () => apiRequest("/dashboard/summary")
