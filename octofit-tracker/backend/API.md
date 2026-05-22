# OctoFit Tracker Backend - API Documentation

## Overview

The OctoFit Tracker backend is a Node.js/Express API server that manages fitness tracking, team management, and leaderboards. The API is Codespaces-aware and supports both GitHub Codespaces and localhost environments.

## Server Configuration

- **Port**: 8000
- **Database**: MongoDB (`octofit_db`)
- **Framework**: Express.js with TypeScript

## API URL Behavior

### Codespaces Environment
When running in GitHub Codespaces, the API automatically generates URLs using `$CODESPACE_NAME`:

```
https://${CODESPACE_NAME}-8000.app.github.dev
```

### Local Development
When running locally, the API falls back to localhost:

```
http://localhost:8000
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Build TypeScript
```bash
npm run build
```

### Start the Server
```bash
npm start
```

### Seed the Database
```bash
npm run seed
```

This populates `octofit_db` with:
- 5 sample users
- 2 teams with members
- 6 activities across different types
- 5 personalized workouts

## API Endpoints

### Root Endpoint
- **GET** `/` - Returns API information and available endpoints

### Users
- **GET** `/api/users/` - Get all users
- **POST** `/api/users/` - Create a new user
- **GET** `/api/users/:id` - Get specific user
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

### Activities
- **GET** `/api/activities/` - Get all activities
- **POST** `/api/activities/` - Log new activity
- **GET** `/api/activities/:id` - Get specific activity
- **PUT** `/api/activities/:id` - Update activity
- **DELETE** `/api/activities/:id` - Delete activity

### Teams
- **GET** `/api/teams/` - Get all teams
- **POST** `/api/teams/` - Create new team
- **GET** `/api/teams/:id` - Get specific team
- **PUT** `/api/teams/:id` - Update team
- **DELETE** `/api/teams/:id` - Delete team

### Leaderboard
- **GET** `/api/leaderboard/` - Global leaderboard (ranked by total calories)
- **GET** `/api/leaderboard/teams` - Team leaderboard
- **GET** `/api/leaderboard/users` - User leaderboard

### Workouts
- **GET** `/api/workouts/` - Get all workout suggestions
- **POST** `/api/workouts/` - Create personalized workout
- **GET** `/api/workouts/:id` - Get specific workout
- **PUT** `/api/workouts/:id` - Update workout
- **DELETE** `/api/workouts/:id` - Delete workout

### Health Check
- **GET** `/health` - Server health status

## Endpoint Validation with curl

### Test Users Endpoint
```bash
# Get all users
curl http://localhost:8000/api/users

# Create a new user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "username": "john_fit"
  }'
```

### Test Activities Endpoint
```bash
# Get all activities
curl http://localhost:8000/api/activities

# Log a new activity (replace USER_ID with actual MongoDB ID)
curl -X POST http://localhost:8000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "type": "running",
    "description": "Morning run",
    "duration": 30,
    "calories": 300
  }'
```

### Test Root Endpoint
```bash
curl http://localhost:8000/ | jq .
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection config
│   ├── models/
│   │   ├── User.ts              # User model
│   │   ├── Team.ts              # Team model
│   │   ├── Activity.ts          # Activity model
│   │   └── Workout.ts           # Workout model
│   ├── routes/
│   │   ├── users.ts             # User routes
│   │   ├── teams.ts             # Team routes
│   │   ├── activities.ts        # Activity routes
│   │   ├── leaderboard.ts       # Leaderboard routes
│   │   └── workouts.ts          # Workout routes
│   ├── scripts/
│   │   └── seed.ts              # Database seed script
│   └── index.ts                 # Main server file
├── dist/                         # Compiled JavaScript
├── package.json
└── tsconfig.json
```

## Environment Variables

- `PORT` - Server port (default: 8000)
- `MONGO_URI` - MongoDB connection URI (default: mongodb://localhost:27017/octofit_db)
- `CODESPACE_NAME` - GitHub Codespaces environment variable (auto-detected)

## Development

### Watch Mode with TypeScript
```bash
npm run dev
```

### Build and Deploy
```bash
npm run build
npm start
```

## Testing

All endpoints have been validated with curl and return proper JSON responses with seeded data.

## Notes

- The API automatically detects Codespaces environment and generates appropriate URLs
- MongoDB must be running for the API to function
- All timestamps are in UTC
- Relationships between users, teams, and activities are maintained via MongoDB ObjectIds
