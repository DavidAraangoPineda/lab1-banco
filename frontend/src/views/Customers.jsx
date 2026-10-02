import { useCallback, useEffect, useState } from 'react'
import { createCustomer, errorMessage, getCustomers } from '../api/bancoApi'

const empty = { firstName: '', lastName: '', accountNumber: '', balance: '' }

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  const load = useCallback(() => {
    getCustomers().then(setCustomers).catch((e) => setError(errorMessage(e)))
  }, [])

  useEffect(load, [load])

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setOk('')
    try {
      await createCustomer({ ...form, balance: Number(form.balance) })
      setForm(empty)
      setOk('Cliente creado correctamente.')
      load()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <section>
      <h2>Clientes</h2>
      <form onSubmit={submit} className="card">
        <h3>Nuevo cliente</h3>
        <input name="firstName" placeholder="Nombre" value={form.firstName} onChange={change} required />
        <input name="lastName" placeholder="Apellido" value={form.lastName} onChange={change} required />
        <input name="accountNumber" placeholder="Número de cuenta" value={form.accountNumber} onChange={change} required />
        <input name="balance" type="number" min="0" step="0.01" placeholder="Saldo inicial" value={form.balance} onChange={change} required />
        <button type="submit">Crear</button>
      </form>
      {ok && <p className="ok">{ok}</p>}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Cuenta</th><th>Saldo</th></tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.firstName}</td><td>{c.lastName}</td>
              <td>{c.accountNumber}</td><td>${Number(c.balance).toLocaleString()}</td>
            </tr>
          ))}
          {customers.length === 0 && <tr><td colSpan="5">Sin clientes.</td></tr>}
        </tbody>
      </table>
    </section>
  )
}
