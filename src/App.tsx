import './App.css'
import Layout from './components/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default App
