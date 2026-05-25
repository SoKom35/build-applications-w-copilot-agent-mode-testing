import React, { useState, useEffect } from 'react'

// API Endpoint
const WORKOUTS_ENDPOINT = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // API Endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME
        const apiUrl = codespaceName 
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
          : `http://localhost:8000/api/workouts`
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // Handle both array and paginated responses
        const workoutsList = Array.isArray(data) ? data : data.data || []
        setWorkouts(workoutsList)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching workouts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <div className="loading">Loading workouts...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="component-container">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="workouts-grid">
          {workouts.map((workout) => (
            <div key={workout._id} className="workout-card">
              <h3>{workout.name || 'Workout'}</h3>
              <p className="workout-description">{workout.description}</p>
              <div className="workout-details">
                {workout.exercises && (
                  <div>
                    <strong>Exercises: {workout.exercises.length}</strong>
                    <ul className="exercises-list">
                      {workout.exercises.slice(0, 3).map((exercise, idx) => (
                        <li key={idx}>{exercise}</li>
                      ))}
                      {workout.exercises.length > 3 && (
                        <li>+{workout.exercises.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
                {workout.difficulty && (
                  <p><strong>Difficulty:</strong> {workout.difficulty}</p>
                )}
                {workout.duration && (
                  <p><strong>Duration:</strong> {workout.duration} min</p>
                )}
              </div>
              <p><small>Created: {new Date(workout.createdAt).toLocaleDateString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts
