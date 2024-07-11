import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Welcome to the Admin Panel</h1>
      <p className="mt-4">This is the main content area.</p>
    </Layout>
  )
}

export default App
