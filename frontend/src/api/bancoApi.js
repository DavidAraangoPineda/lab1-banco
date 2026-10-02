import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getCustomers = () => api.get('/customers').then((r) => r.data)
export const createCustomer = (customer) => api.post('/customers', customer).then((r) => r.data)
export const transfer = (data) => api.post('/transactions', data).then((r) => r.data)
export const getTransactions = (accountNumber) =>
  api.get(`/transactions/${encodeURIComponent(accountNumber)}`).then((r) => r.data)

// El backend devuelve el mensaje de error como texto plano en los 400.
export const errorMessage = (e) =>
  typeof e.response?.data === 'string' && e.response.data
    ? e.response.data
    : e.response?.data?.message || e.message
