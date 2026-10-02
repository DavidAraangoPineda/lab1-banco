import { useEffect, useState } from 'react'
import { errorMessage, getCustomers, getTransactions } from '../api/bancoApi'

export default function History() {
  const [customers, setCustomers] = useState([])
  const [account, setAccount] = useState('')
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCustomers().then(setCustomers).catch((e) => setError(errorMessage(e)))
  }, [])

  const pick = async (e) => {
    const value = e.target.value
    setAccount(value)
    setError('')
    setTransactions([])
    if (!value) return
    try {
      setTransactions(await getTransactions(value))
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <section>
      <h2>Histórico de transacciones</h2>
      <select value={account} onChange={pick}>
        <option value="">Selecciona un cliente</option>
        {customers.map((c) => (
          <option key={c.id} value={c.accountNumber}>
            {c.firstName} {c.lastName} - {c.accountNumber}
          </option>
        ))}
      </select>
      {error && <p className="error">{error}</p>}
      {account && (
        <table>
          <thead>
            <tr><th>ID</th><th>Tipo</th><th>Origen</th><th>Destino</th><th>Monto</th><th>Fecha</th></tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              const sent = t.senderAccountNumber === account
              return (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td className={sent ? 'out' : 'in'}>{sent ? 'Enviada' : 'Recibida'}</td>
                  <td>{t.senderAccountNumber}</td><td>{t.receiverAccountNumber}</td>
                  <td>${Number(t.amount).toLocaleString()}</td>
                  <td>{t.timestamp ? new Date(t.timestamp).toLocaleString() : ''}</td>
                </tr>
              )
            })}
            {transactions.length === 0 && <tr><td colSpan="6">Sin transacciones.</td></tr>}
          </tbody>
        </table>
      )}
    </section>
  )
}
