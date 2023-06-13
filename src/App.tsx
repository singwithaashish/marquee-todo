import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import { TodoProvider } from './contexts/TodoContext'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TodoProvider>
      
      <Dashboard />
    </TodoProvider>
    </>
  )
}

export default App
