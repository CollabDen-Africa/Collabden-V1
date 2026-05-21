# CollabDen Backend API Documentation Reference

Extraction Date: 2026-05-03
Source: [Swagger UI](https://collabden-backend.onrender.com/api-docs/#/)
Base URL: `https://collabden-backend.onrender.com`
Auth: `Authorization: Bearer <JWT>` (Handled via HTTP-only cookies in frontend proxy)

---

## 🔐 Authentication Endpoints

### 1. Register User
- **Endpoint:** `POST /api/v1/user/signup`
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

### 9. Update Onboarding Status (NEW)
- **Endpoint:** `PATCH /api/v1/user/onboarding`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body:**
  ```json
  {
    "hasCompletedOnboarding": true
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Status updated successfully |
  | `401`  | Unauthorized |

---

## 📊 Dashboard Endpoints

### 10. Fetch Dashboard Data
- **Endpoint:** `GET /api/v1/dashboard`
- **Auth Required:** Yes (`Bearer <token>`)
- **Description:** Aggregates active projects and recent notifications for the authenticated user.
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Dashboard data fetched successfully |
  | `401`  | Unauthorized |

---

## 🔔 Notification Endpoints

### Notification Schema
```json
{
  "id": "string",
  "userId": "string",
  "title": "string",
  "message": "string",
  "type": "INVITE" | "SYSTEM" | "PROJECT_CREATED" | "TASK_ASSIGNED" | "MESSAGE",
  "isRead": boolean,
  "link": "string | null",
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

### 11. Get All Notifications
- **Endpoint:** `GET /api/v1/notifications`
- **Auth Required:** Yes (`Bearer <token>`)
- **Description:** Returns all notifications for the currently logged-in user.
- **Response (200):** Array of notification objects.

### 12. Mark All Notifications as Read
- **Endpoint:** `PATCH /api/v1/notifications/read-all`
- **Auth Required:** Yes (`Bearer <token>`)
- **Response (200):** `{ "message": "All notifications marked as read" }`

### 13. Mark Single Notification as Read
- **Endpoint:** `PATCH /api/v1/notifications/{id}/read`
- **Auth Required:** Yes (`Bearer <token>`)
- **Path Parameters:** `id` (string)
- **Response (200):** `{ "message": "Notification marked as read", "notification": { ... } }`

---

## 📁 Project Endpoints

### 14. Create Project
- **Endpoint:** `POST /api/v1/projects`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body (required):**
  ```json
  {
    "name": "string",
    "description": "string",
    "genre": "string",
    "startDate": "ISO 8601",
    "visibility": "PUBLIC" | "PRIVATE"
  }
  ```

### 15. List All User Projects
- **Endpoint:** `GET /api/v1/projects`
- **Auth Required:** Yes (`Bearer <token>`)

### 16. Get Project Details
- **Endpoint:** `GET /api/v1/projects/{id}`
- **Auth Required:** Yes (`Bearer <token>`)

### 17. Update Project (NEW)
- **Endpoint:** `PATCH /api/v1/projects/{id}`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body:** Partial update of project fields.

### 18. Delete Project (NEW)
- **Endpoint:** `DELETE /api/v1/projects/{id}`
- **Auth Required:** Yes (`Bearer <token>`)

### 19. Invite Collaborator
- **Endpoint:** `POST /api/v1/projects/{id}/invite`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body:** `{ "collaboratorId": "string" }`

### 20. Remove Collaborator (NEW)
- **Endpoint:** `DELETE /api/v1/projects/{id}/collaborators/{collaboratorId}`
- **Auth Required:** Yes (`Bearer <token>`)

---

## 📜 Legal Agreements Endpoints

### Legal Agreement Schema
```json
{
  "id": "string",
  "projectId": "string",
  "title": "string | null",
  "content": "string | null",
  "fileUrl": "string | null",
  "status": "DRAFT" | "PENDING_SIGNATURE" | "SIGNED",
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601",
  "signatures": [
    {
      "id": "string",
      "agreementId": "string",
      "userId": "string",
      "legalName": "string",
      "signedAt": "ISO 8601"
    }
  ]
}
```

### 21. Upload Draft Agreement
- **Endpoint:** `POST /api/v1/projects/{projectId}/agreements`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body (Multipart Form):**
  - `file`: PDF file (required, max 10MB)
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `201`  | Draft agreement uploaded successfully |
  | `400`  | No file uploaded |
  | `403`  | Plan limit reached or access denied |

### 22. Get All Agreements for Project
- **Endpoint:** `GET /api/v1/projects/{projectId}/agreements`
- **Auth Required:** Yes (`Bearer <token>`)
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Returns an array of agreements for the project |

### 23. Edit/Replace Draft Agreement
- **Endpoint:** `PUT /api/v1/projects/{projectId}/agreements/{id}`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body (Multipart Form or JSON):**
  - `file`: PDF file (optional)
  - `title`: string (optional)
  - `content`: string (optional)
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Agreement updated successfully |
  | `400`  | Cannot edit a signed agreement |
  | `403`  | Only project owner can edit |

### 24. Update Agreement Status Manually
- **Endpoint:** `PATCH /api/v1/projects/{projectId}/agreements/{id}/status`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body:**
  ```json
  {
    "status": "PENDING_SIGNATURE" | "SIGNED"
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Status updated successfully |
  | `400`  | Invalid status transition |

### 25. Upload Signed Copy Manually
- **Endpoint:** `POST /api/v1/projects/{projectId}/agreements/{id}/sign`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body (Multipart Form):**
  - `file`: Signed PDF copy (required)
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Signed agreement uploaded and locked |
  | `400`  | Agreement already signed |

### 26. Electronically Sign Agreement
- **Endpoint:** `POST /api/v1/projects/{projectId}/agreements/{id}/esign`
- **Auth Required:** Yes (`Bearer <token>`)
- **Request Body:**
  ```json
  {
    "intentToSign": true
  }
  ```
- **Responses:**
  | Status | Description |
  |--------|-------------|
  | `200`  | Agreement e-signed successfully |
  | `400`  | Missing checkbox intent |

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
| 9 | `PATCH` | `/api/v1/user/onboarding` | Yes | Auth |
| 10 | `GET` | `/api/v1/dashboard` | Yes | Dashboard |
| 11 | `GET` | `/api/v1/notifications` | Yes | Notifications |
| 12 | `PATCH` | `/api/v1/notifications/read-all` | Yes | Notifications |
| 13 | `PATCH` | `/api/v1/notifications/{id}/read` | Yes | Notifications |
| 14 | `POST` | `/api/v1/projects` | Yes | Projects |
| 15 | `GET` | `/api/v1/projects` | Yes | Projects |
| 16 | `GET` | `/api/v1/projects/{id}` | Yes | Projects |
| 17 | `PUT` | `/api/v1/projects/{id}` | Yes | Projects |
| 18 | `DELETE` | `/api/v1/projects/{id}` | Yes | Projects |
| 19 | `POST` | `/api/v1/projects/{id}/invite` | Yes | Projects |
| 20 | `DELETE` | `/api/v1/projects/{id}/collaborators/{collaboratorId}` | Yes | Projects |
| 21 | `POST` | `/api/v1/projects/{projectId}/agreements` | Yes | Agreements |
| 22 | `GET` | `/api/v1/projects/{projectId}/agreements` | Yes | Agreements |
| 23 | `PUT` | `/api/v1/projects/{projectId}/agreements/{id}` | Yes | Agreements |
| 24 | `PATCH` | `/api/v1/projects/{projectId}/agreements/{id}/status` | Yes | Agreements |
| 25 | `POST` | `/api/v1/projects/{projectId}/agreements/{id}/sign` | Yes | Agreements |
| 26 | `POST` | `/api/v1/projects/{projectId}/agreements/{id}/esign` | Yes | Agreements |
