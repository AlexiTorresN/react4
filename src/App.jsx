import { useState } from 'react'
import './css/App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { TodoList } from './components/TodoList'

export function App() {
  const [count, setCount] = useState(0)

  return (  // Inicio del contenido principal

    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow-1 d-flex overflow-auto">
        <div className="container py-4">
          <TodoList />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>

  )  // Fin del contenido principal
}

export default App