# Task Manager API

A beginner-friendly RESTful API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for managing tasks.

---

## 📁 Project Structure

```text
task-manager-api/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   └── taskController.js     # Request handlers for Task operations
├── models/
│   └── Task.js               # Mongoose Schema & Model for Task
├── routes/
│   └── taskRoutes.js         # API Route definitions
├── middleware/
│   └── errorMiddleware.js    # ID validation & centralized error handling
├── .env                      # Environment variables
├── .gitignore                # Files excluded from version control
├── package.json              # Project dependencies and scripts
├── server.js                 # Express application entry point
└── README.md                 # Project documentation & Postman guide
```

---

## 🛠️ Requirements & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v16 or higher)
- [MongoDB](https://www.mongodb.com/) running locally or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database URI.

### 1. Install Dependencies
In the project root directory, run:
```bash
npm install
```

### 2. Configure Environment Variables
Create or verify `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
```

### 3. Run the Server

- **Production mode**:
  ```bash
  npm start
  ```
- **Development mode** (with auto-reload using `nodemon`):
  ```bash
  npm run dev
  ```

---

## 📋 Task Model Specification

Each Task object contains the following fields:

| Field | Type | Required | Enum / Default Values | Description |
|---|---|---|---|---|
| `title` | String | **Yes** | Trimmed text | Title of the task |
| `description` | String | No | Default: `""` | Additional details about the task |
| `status` | String | No | `pending` (default), `in-progress`, `completed` | Task progress status |
| `priority` | String | No | `low`, `medium` (default), `high` | Priority level |
| `dueDate` | Date | No | Optional Date string (`YYYY-MM-DD`) | Target completion date |
| `createdAt` | Date | Automatic | `Date.now` | Creation timestamp |

---

## 🚀 REST API Endpoints & Postman Guide

Base URL: `http://localhost:5000`

### 1. Create a Task
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/tasks`
- **Headers**: `Content-Type: application/json`
- **Request Body Example**:
```json
{
  "title": "Complete Backend Project",
  "description": "Build Task Manager API using Node.js and Express",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-08-30"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "_id": "66b9f123abc456def7890123",
    "title": "Complete Backend Project",
    "description": "Build Task Manager API using Node.js and Express",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-08-30T00:00:00.000Z",
    "createdAt": "2026-08-13T18:40:00.000Z",
    "__v": 0
  }
}
```

---

### 2. Get All Tasks (with Filtering)
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/tasks`

#### Query Parameters Filtering:
- Filter by status: `GET /api/tasks?status=pending`
- Filter by priority: `GET /api/tasks?priority=high`
- Combined filter: `GET /api/tasks?status=pending&priority=high`

- **Response (200 OK)**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "66b9f123abc456def7890123",
      "title": "Complete Backend Project",
      "description": "Build Task Manager API using Node.js and Express",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-08-30T00:00:00.000Z",
      "createdAt": "2026-08-13T18:40:00.000Z"
    }
  ]
}
```

---

### 3. Get a Single Task
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/tasks/:id`
  *(Example: `http://localhost:5000/api/tasks/66b9f123abc456def7890123`)*

- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "66b9f123abc456def7890123",
    "title": "Complete Backend Project",
    "description": "Build Task Manager API using Node.js and Express",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2026-08-30T00:00:00.000Z",
    "createdAt": "2026-08-13T18:40:00.000Z"
  }
}
```

---

### 4. Update a Task
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/tasks/:id`
- **Headers**: `Content-Type: application/json`
- **Request Body Example**:
```json
{
  "title": "Updated Task Title",
  "description": "Updated detailed task description",
  "priority": "medium"
}
```

- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "66b9f123abc456def7890123",
    "title": "Updated Task Title",
    "description": "Updated detailed task description",
    "status": "in-progress",
    "priority": "medium",
    "dueDate": "2026-08-30T00:00:00.000Z",
    "createdAt": "2026-08-13T18:40:00.000Z"
  }
}
```

---

### 5. Update Task Status
- **Method**: `PATCH`
- **URL**: `http://localhost:5000/api/tasks/:id/status`
- **Headers**: `Content-Type: application/json`
- **Request Body Example**:
```json
{
  "status": "completed"
}
```

- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "_id": "66b9f123abc456def7890123",
    "title": "Updated Task Title",
    "status": "completed",
    "priority": "medium"
  }
}
```

---

### 6. Delete a Task
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/tasks/:id`

- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## ⚠️ Error Responses

All error responses return clean JSON objects:

- **Invalid MongoDB ObjectId (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Invalid Task ID format"
}
```

- **Missing Title (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Title is required"
}
```

- **Invalid Status or Priority (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Invalid status 'done'. Allowed values: pending, in-progress, completed"
}
```

- **Task Not Found (404 Not Found)**:
```json
{
  "success": false,
  "message": "Task not found"
}
```

---

## 🛡️ Best Practices & Features Included
- Clear modular structure (`config`, `models`, `controllers`, `routes`, `middleware`).
- Mongoose schema-level validation & custom express validation.
- MongoDB ObjectId format verification before DB calls.
- Standard HTTP Status Codes (200, 201, 400, 404, 500).
- Centralized Express error handler.
