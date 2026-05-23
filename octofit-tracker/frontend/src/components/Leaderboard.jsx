import React, { useState, useEffect } from 'react'
import { getApiUrl } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = getApiUrl()
        const response = await fetch(`${apiUrl}/api/leaderboard`)
        
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
