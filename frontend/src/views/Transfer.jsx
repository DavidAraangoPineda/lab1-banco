import { useEffect, useState } from 'react'
import { errorMessage, getCustomers, transfer } from '../api/bancoApi'

export default function Transfer() {
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState({ senderAccountNumber: '', receiverAccountNumber: '', amount: '' })
  const [error, setError] = useState('')
  const [ok, setOk] = useState('')

  useEffect(() => {
    getCustomers().then(setCustomers).catch((e) => setError(errorMessage(e)))
  }, [])

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setOk('')
    try {
      const t = await transfer({ ...form, amount: Number(form.amount) })
      setOk(`Transferencia #${t.id} realizada por $${t.amount}.`)
      setForm({ ...form, amount: '' })
      setCustomers(await getCustomers())
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  const select = (name, label) => (
    <select name={name} value={form[name]} onChange={change} required>
      <option value="">{label}</option>
      {customers.map((c) => (
        <option key={c.id} value={c.accountNumber}>
          {c.accountNumber} - {c.firstName} {c.lastName} (${Number(c.balance).toLocaleString()})
        </option>
      ))}
    </select>
  )

  return (
    <section>
      <h2>Transferir dinero</h2>
      <form onSubmit={submit} className="card">
        {select('senderAccountNumber', 'Cuenta origen')}
        {select('receiverAccountNumber', 'Cuenta destino')}
        <input name="amount" type="number" min="0.01" step="0.01" placeholder="Monto" value={form.amount} onChange={change} required />
        <button type="submit">Transferir</button>
      </form>
      {ok && <p className="ok">{ok}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  )
}
