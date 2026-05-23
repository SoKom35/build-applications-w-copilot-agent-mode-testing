import React, { useState, useEffect } from 'react'
import { getApiUrl } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = getApiUrl()
        const response = await fetch(`${apiUrl}/api/activities`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // Handle both array and paginated responses
        const activitiesList = Array.isArray(data) ? data : data.data || []
        setActivities(activitiesList)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching activities:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  if (loading) return <div className="loading">Loading activities...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div className="activities-list">
          {activities.map((activity) => (
            <div key={activity._id} className="activity-card">
              <div className="activity-header">
                <h3>{activity.type.toUpperCase()}</h3>
                <span className="activity-date">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-stats">
                <span>Duration: {activity.duration} min</span>
                <span>Calories: {activity.calories}</span>
              </div>
              {activity.userId && (
                <p className="activity-user">
                  <small>By: {activity.userId.name || activity.userId}</small>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Activities
