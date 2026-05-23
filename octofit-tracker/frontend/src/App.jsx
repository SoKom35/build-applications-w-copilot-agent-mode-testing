import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">
            <h1>🏋️ OctoFit Tracker</h1>
          </div>
          <ul className="nav-menu">
            <li><Link to="/">Users</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
