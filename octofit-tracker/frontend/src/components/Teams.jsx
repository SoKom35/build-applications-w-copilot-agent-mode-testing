import React, { useState, useEffect } from 'react'

// API Endpoint
const TEAMS_ENDPOINT = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/teams'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // API Endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/teams
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/teams`
          : `http://localhost:8000/api/teams`
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // Handle both array and paginated responses
        const teamsList = Array.isArray(data) ? data : data.data || []
        setTeams(teamsList)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching teams:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <div className="loading">Loading teams...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div className="teams-grid">
          {teams.map((team) => (
            <div key={team._id} className="team-card">
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <div className="team-members">
                <strong>Members: {team.members ? team.members.length : 0}</strong>
                {team.members && team.members.length > 0 && (
                  <ul>
                    {team.members.slice(0, 5).map((member, idx) => (
                      <li key={idx}>{member.name || member}</li>
                    ))}
                    {team.members.length > 5 && (
                      <li>+{team.members.length - 5} more</li>
                    )}
                  </ul>
                )}
              </div>
              <p><small>Created: {new Date(team.createdAt).toLocaleDateString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams
