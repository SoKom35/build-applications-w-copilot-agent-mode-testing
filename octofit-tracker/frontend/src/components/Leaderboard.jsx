import React, { useState, useEffect } from 'react'

// API Endpoint
const LEADERBOARD_ENDPOINT = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // API Endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
          : `http://localhost:8000/api/leaderboard`
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // Handle both array and paginated responses
        const leaderboardList = Array.isArray(data) ? data : data.data || []
        setLeaderboard(leaderboardList)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching leaderboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <div className="loading">Loading leaderboard...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data available</p>
      ) : (
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Total Calories</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || index} className={index === 0 ? 'top-rank' : ''}>
                  <td className="rank">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td className="user-name">
                    {entry.userName || entry.name || entry.username || 'Unknown'}
                  </td>
                  <td className="total-calories">
                    {entry.totalCalories || entry.calories || 0}
                  </td>
                  <td className="activity-count">
                    {entry.activityCount || entry.count || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
