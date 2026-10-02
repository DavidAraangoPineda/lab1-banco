import { useState } from 'react'
import Customers from './views/Customers'
import History from './views/History'
import Transfer from './views/Transfer'

const tabs = [
  { id: 'customers', label: 'Clientes', view: Customers },
  { id: 'transfer', label: 'Transferir', view: Transfer },
  { id: 'history', label: 'Histórico', view: History },
]

export default function App() {
  const [tab, setTab] = useState('customers')
  const View = tabs.find((t) => t.id === tab).view

  return (
    <div className="app">
      <h1>Banco UdeA</h1>
      <nav>
        {tabs.map((t) => (
          <button key={t.id} className={t.id === tab ? 'active' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>
      <View key={tab} />
    </div>
  )
}
