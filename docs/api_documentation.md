# Robo Events API Documentation

This document provides comprehensive documentation for the Robo Events API, including endpoint references, request/response examples, and authentication requirements.

---

## Base URL
All API endpoints are relative to: `http://localhost/api/`

## Authentication
Most endpoints are publicly accessible. Endpoints requiring authentication are clearly marked with 🔒.

## API Endpoint Index

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|-----------------|
| `/events/` | GET | List all events (minimal data) | Public |
| `/event-details/{id}/` | GET | Get detailed event information | Public |
| `/top-team-ranks/` | GET | Get top ranked teams | Public |
| `/featured-news/` | GET | Get featured news items | Public |
| `/competitions/` | GET | List all championships | Public |
| `/banner-video/` | GET | Get site banner configuration | Public |
| `/news-updates/` | GET | List all news updates | Public |
| `/register-team/` | POST | Register a new team | Public |
| `/event-registration/` | POST | Register team for an event | 🔒 Authenticated |
| `/homepage/` | GET | Get homepage data | Public |

---

## Event Endpoints

### 1. List Events (Minimal Data)

Returns a paginated list of all events with minimal data for quick loading.

**Endpoint:** `GET /api/events/`

**Response Example (200 OK):**
```json
[
    {
        "id": 1,
        "name": "Robo Race",
        "championship": {
            "id": 1,
            "name": "Robo Cup 2025",
            "start_date": "2025-07-01",
            "end_date": "2025-07-31",
            "is_active": true,
            "location": "Bhopal, Madhya Pradesh, India"
        }
    },
    {
        "id": 2,
        "name": "Line Follower",
        "championship": {
            "id": 1,
            "name": "Robo Cup 2025",
            "start_date": "2025-07-01",
            "end_date": "2025-07-31",
            "is_active": true,
            "location": "Bhopal, Madhya Pradesh, India"
        }
    }
]
```

### 2. Get Event Details

Returns complete details for a specific event.

**Endpoint:** `GET /api/event-details/{id}/`

**Path Parameters:**
- `id` (required): The ID of the event

**Response Example (200 OK):**
```json
{
  "id": 1,
  "name": "Robo Race",
  "slug": "robo-race",
  "championship_id": 1,
  "short_description": "High-speed robot racing competition",
  "start_date": "2025-07-15",
  "end_date": "2025-07-16",
  "location": "Main Arena, Tech Convention Center",
  "rules_and_eligibility": "Detailed rules and eligibility criteria...",
  "organized_by": "Robo Events Committee",
  "sponsored_by": "Tech Corp Inc.",
  "display_in_navigation": true
}
```

**Error Responses:**
- `404 Not Found`: If the event with the specified ID does not exist

## Championship Endpoints

### List Championships

Returns a list of all championships/competitions.

**Endpoint:** `GET /api/competitions/`

**Response Example (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Robo Championship 2025",
    "start_date": "2025-07-15",
    "end_date": "2025-07-20",
    "is_active": true,
    "location": "Tech Convention Center"
  }
]
```

## Team Endpoints

### Register Team

Register a new team with team members. This endpoint creates a new team and associated member records. If an email is provided for a member, the system will create a user account (inactive by default) and send an activation link to the provided email.

**Endpoint:** `POST /api/register-team/`

**Request Body:**
```json
{
  "name": "Robo Warriors",
  "institution": "Tech University",
  "members": [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Team Leader",
      "phone": "+1234567890"
    },
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "Programmer",
      "phone": "+1987654321"
    }
  ]
}
```

**Fields Description:**
- `name`: (required) Name of the team (must be unique)
- `institution`: (optional) School/University/Organization name
- `members`: (required, array) List of team members (minimum 1 member required)
  - `name`: (required) Member's full name
  - `email`: (required) Member's email address (must be valid email format)
  - `role`: (optional) Member's role in the team (e.g., "Team Leader", "Programmer")
  - `phone`: (optional) Contact number

**Response (201 Created):**
```json
{
  "id": 1,
  "name": "Robo Warriors",
  "institution": "Tech University",
  "members": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "Team Leader",
      "phone": "+1234567890"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "Programmer",
      "phone": "+1987654321"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request`: 
  - If required fields are missing
  - If team name already exists
  - If email format is invalid
  - If members array is empty
  - If any member is missing required fields
  ```json
  {
    "name": ["team with this name already exists."]
  }
  ```
  
  ```json
  {
    "members": [
      {"email": ["Enter a valid email address."]}
    ]
  }
  ```

### Register for Event (🔒)

Register a team for an event. Requires authentication.

**Endpoint:** `POST /api/event-registration/`

**Headers:**
```
Authorization: Token your_auth_token
```

**Request Body:**
```json
{
  "team": 1,
  "event": 1
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "team": 1,
  "event": 1,
  "created_at": "2025-06-08T18:14:30.123456Z"
}
```

**Error Responses:**
- `400 Bad Request`: If team or event is missing
- `403 Forbidden`: If user is not a member of the specified team
- `401 Unauthorized`: If no authentication token provided

## News Endpoints

### List News Updates

Returns a list of all news updates.

**Endpoint:** `GET /api/news-updates/`

**Query Parameters:**
- `is_published` (optional): Filter by published status (true/false)
- `ordering` (optional): Sort results (e.g., `-news_date` for newest first)

**Response Example (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Robo Championship 2025 Announced",
    "news_date": "2025-05-01T10:00:00Z",
    "content": "We're excited to announce...",
    "image_url": "https://example.com/news1.jpg",
    "is_published": true
  }
]
```


## Error Handling

Standard HTTP status codes are used to indicate success or failure of API requests:

- `200 OK`: Request was successful
- `201 Created`: Resource was successfully created
- `400 Bad Request`: Invalid request (missing or invalid parameters)
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error (contact support)

## Rate Limiting

Public API endpoints are rate limited to prevent abuse. If you exceed the rate limit, you will receive a `429 Too Many Requests` response.

---



