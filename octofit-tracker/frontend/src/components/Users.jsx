import React, { useState, useEffect } from 'react'
import { getApiUrl } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = getApiUrl()
        const response = await fetch(`${apiUrl}/api/users`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // Handle both array and paginated responses
        const usersList = Array.isArray(data) ? data : data.data || []
        setUsers(usersList)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><small>Joined: {new Date(user.createdAt).toLocaleDateString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
