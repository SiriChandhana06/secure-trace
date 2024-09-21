import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Visualizer from './pages/Visualizer'
import PortfolioTracker from './pages/PortfolioTracker'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/visualizer" element={<Visualizer />} />
        <Route path="/portfolio_tracker" element={<PortfolioTracker />} />
      </Routes>
    </BrowserRouter>
  )
}
