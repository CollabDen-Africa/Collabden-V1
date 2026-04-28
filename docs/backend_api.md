# CollabDen Backend API Documentation Reference

Extraction Date: 2026-04-28
Source: [Swagger UI](https://collabden-backend.onrender.com/api-docs/#/)
Base URL: `https://collabden-backend.onrender.com`
Auth: `Authorization: Bearer <JWT>`

---

## 🔐 Authentication Endpoints

### 1. Register User
- **Endpoint:** `POST /api/v1/user/signup`
- **Auth Required:** No
- **Request Body (required):**
  ```json
  {
    "email": "string",       // required
    "password": "string",    // required
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `201`  | User created successfully |
  | `400`  | Bad request (missing/invalid fields) |

### 2. Login User
- **Endpoint:** `POST /api/v1/user/login`
- **Auth Required:** No
- **Request Body (required):**
  ```json
  {
    "email": "string",       // required
    "password": "string"     // required
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Login successful |
  | `401`  | Unauthorized |

### 3. Google Authentication
- **Initiate Google Auth**
  - **Endpoint:** `GET /api/v1/user/auth/google`
  - **Auth Required:** No
  - **Description:** Redirects the user to the Google OAuth2 consent screen.
  - **Responses:**
    | Status | Description |
    |--------|-------------|
    | `302`  | Redirect to Google |

- **Google Auth Callback**
  - **Endpoint:** `GET /api/v1/user/auth/google/callback`
  - **Auth Required:** No
  - **Query Parameters:**
    | Param  | Type   | Required | Description |
    |--------|--------|----------|-------------|
    | `code` | string | Yes      | Authorization code returned by Google |
  - **Responses:**
    | Status | Description |
    |--------|-------------|
    | `302`  | Redirect to frontend with token (`/auth-callback?token=...`) |

### 4. Verify Email
- **Endpoint:** `POST /api/v1/user/verify`
- **Auth Required:** No
- **Request Body (required):**
  ```json
  {
    "email": "string",               // required
    "verificationToken": "string"    // required
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Email verified |

### 5. Resend Verification Code
- **Endpoint:** `POST /api/v1/user/resend-verify`
- **Auth Required:** No
- **Request Body (required):**
  ```json
  {
    "email": "string"    // required
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Verification code resent successfully |
  | `400`  | Bad request |

### 6. Forgot Password
- **Endpoint:** `POST /api/v1/user/forgot-password`
- **Auth Required:** No
- **Request Body (required):**
  ```json
  {
    "email": "string"    // required
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Recovery email sent |

### 7. Reset Password
- **Endpoint:** `POST /api/v1/user/reset-password`
- **Auth Required:** No
- **Request Body (required):**
  ```json
  {
    "password": "string",    // required
    "token": "string"        // required
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Password reset successfully |

### 8. User Profile
- **Endpoint:** `GET /api/v1/user/profile`
- **Auth Required:** Yes (`Bearer <token>`)
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Success — returns user profile object |
  | `401`  | Unauthorized |

---

## 📊 Dashboard Endpoints (NEW)

### 9. Fetch Dashboard Data
- **Endpoint:** `GET /api/v1/dashboard`
- **Auth Required:** Yes (`Bearer <token>`)
- **Description:** Aggregates active projects and recent notifications for the authenticated user.
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Dashboard data fetched successfully |
  | `401`  | Unauthorized |

> **Note:** The Swagger spec does not document the `200` response shape. The exact response body structure needs to be confirmed with the backend team. Likely returns an object containing `activeProjects[]`, `notifications[]`, and aggregate stats.

---

## 🔔 Notification Endpoints (NEW)

### Notification Schema
```json
{
  "id": "string",                    // Unique notification ID (e.g. "clx1abc2d0001abcd1234efgh")
  "userId": "string",                // ID of the user this notification belongs to
  "title": "string",                 // e.g. "Project Created"
  "message": "string",               // e.g. "Your project \"My App\" has been created successfully."
  "type": "NotificationType",        // See enum below
  "isRead": false,                   // boolean — whether the notification has been read
  "link": "string | null",           // Optional URL to navigate to (e.g. "/projects/clx1abc...")
  "createdAt": "ISO 8601 datetime",
  "updatedAt": "ISO 8601 datetime"
}
```

### NotificationType Enum
```typescript
type NotificationType =
  | "INVITE"
  | "SYSTEM"
  | "PROJECT_CREATED"
  | "TASK_ASSIGNED"
  | "MESSAGE";
```

### 10. Get All Notifications
- **Endpoint:** `GET /api/v1/notifications`
- **Auth Required:** Yes (`Bearer <token>`)
- **Description:** Returns all notifications for the currently logged-in user, ordered by most recent first.
- **Response (200):**
  ```json
  [
    {
      "id": "clx1abc2d0001abcd1234efgh",
      "userId": "clx0xyz1a0000abcd5678ijkl",
      "title": "Project Created",
      "message": "Your project \"My App\" has been created successfully.",
      "type": "PROJECT_CREATED",
      "isRead": false,
      "link": "/projects/clx1abc2d0001abcd1234efgh",
      "createdAt": "2026-04-28T10:00:00Z",
      "updatedAt": "2026-04-28T10:00:00Z"
    }
  ]
  ```
- **Error Responses:**
  | Status | Description | Example |
  |--------|-------------|---------|
  | `401`  | Unauthorized — missing or invalid token | `{ "message": "No token, unauthorized" }` |
  | `500`  | Internal server error | `{ "error": "Something went wrong" }` |

### 11. Mark All Notifications as Read
- **Endpoint:** `PATCH /api/v1/notifications/read-all`
- **Auth Required:** Yes (`Bearer <token>`)
- **Description:** Marks all unread notifications for the authenticated user as read.
- **Response (200):**
  ```json
  {
    "message": "All notifications marked as read"
  }
  ```
- **Error Responses:**
  | Status | Description | Example |
  |--------|-------------|---------|
  | `401`  | Unauthorized — missing or invalid token | `{ "message": "No token, unauthorized" }` |
  | `500`  | Internal server error | `{ "error": "Something went wrong" }` |

### 12. Mark Single Notification as Read
- **Endpoint:** `PATCH /api/v1/notifications/{id}/read`
- **Auth Required:** Yes (`Bearer <token>`)
- **Path Parameters:**
  | Param | Type   | Required | Description |
  |-------|--------|----------|-------------|
  | `id`  | string | Yes      | The notification ID to mark as read (e.g. `clx1abc2d0001abcd1234efgh`) |
- **Response (200):**
  ```json
  {
    "message": "Notification marked as read",
    "notification": { /* full Notification object */ }
  }
  ```
- **Error Responses:**
  | Status | Description | Example |
  |--------|-------------|---------|
  | `401`  | Unauthorized — missing or invalid token | `{ "message": "No token, unauthorized" }` |
  | `500`  | Internal server error | `{ "error": "Something went wrong" }` |

---

## 📁 Project Endpoints (NEW)

### Visibility Enum
```typescript
type ProjectVisibility = "PUBLIC" | "PRIVATE";
```

### 13. Create Project
- **Endpoint:** `POST /api/v1/projects`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body (required):**
  ```json
  {
    "name": "string",           // required
    "description": "string",    // optional
    "genre": "string",          // required
    "startDate": "ISO 8601",    // required (date-time format)
    "visibility": "PUBLIC"      // optional — enum: "PUBLIC" | "PRIVATE"
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `201`  | Project created successfully |
  | `400`  | Missing required fields |

### 14. List All User Projects
- **Endpoint:** `GET /api/v1/projects`
- **Auth Required:** Yes (`Bearer <token>`)
- **Description:** List all active projects for the authenticated user.
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | List of projects fetched successfully |

### 15. Get Project Details (Workspace)
- **Endpoint:** `GET /api/v1/projects/{id}`
- **Auth Required:** Yes (`Bearer <token>`)
- **Path Parameters:**
  | Param | Type   | Required | Description |
  |-------|--------|----------|-------------|
  | `id`  | string | Yes      | The project ID |
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Project details fetched successfully |
  | `404`  | Project not found |

### 16. Invite Collaborator to Project
- **Endpoint:** `POST /api/v1/projects/{id}/invite`
- **Auth Required:** Yes (`Bearer <token>`)
- **Path Parameters:**
  | Param | Type   | Required | Description |
  |-------|--------|----------|-------------|
  | `id`  | string | Yes      | The project ID |
- **Request Body (required):**
  ```json
  {
    "collaboratorId": "string"    // required — user ID of the collaborator
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Collaborator invited successfully |
  | `404`  | Project or User not found |

---

## 📋 Summary of All Endpoints

| # | Method | Endpoint | Auth | Section |
|---|--------|----------|------|---------|
| 1 | `POST` | `/api/v1/user/signup` | No | Auth |
| 2 | `POST` | `/api/v1/user/login` | No | Auth |
| 3a | `GET` | `/api/v1/user/auth/google` | No | Auth |
| 3b | `GET` | `/api/v1/user/auth/google/callback` | No | Auth |
| 4 | `POST` | `/api/v1/user/verify` | No | Auth |
| 5 | `POST` | `/api/v1/user/resend-verify` | No | Auth |
| 6 | `POST` | `/api/v1/user/forgot-password` | No | Auth |
| 7 | `POST` | `/api/v1/user/reset-password` | No | Auth |
| 8 | `GET` | `/api/v1/user/profile` | Yes | Auth |
| 9 | `GET` | `/api/v1/dashboard` | Yes | Dashboard |
| 10 | `GET` | `/api/v1/notifications` | Yes | Notifications |
| 11 | `PATCH` | `/api/v1/notifications/read-all` | Yes | Notifications |
| 12 | `PATCH` | `/api/v1/notifications/{id}/read` | Yes | Notifications |
| 13 | `POST` | `/api/v1/projects` | Yes | Projects |
| 14 | `GET` | `/api/v1/projects` | Yes | Projects |
| 15 | `GET` | `/api/v1/projects/{id}` | Yes | Projects |
| 16 | `POST` | `/api/v1/projects/{id}/invite` | Yes | Projects |

---

## ⚠️ Notable Changes from Previous Extraction

1. **Signup payload updated:** `name` is now a **required** field alongside `email` and `password`.
2. **8 new endpoints added:** Dashboard (1), Notifications (3), Projects (4).
3. **Notification schema fully documented** with enum types.
4. **Project visibility enum** introduced: `PUBLIC` | `PRIVATE`.
