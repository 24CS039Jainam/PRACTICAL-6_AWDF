# AWDF Practical 6 — Full Stack Task Manager

**Student:** Jainam Khetani  
**Roll No.:** 24CS039  
**Subject:** Advanced Web Development Frameworks (ITUE301)

## Practical 6
React + Node.js + Express + MongoDB full-stack integration.

## What is implemented

- React frontend
- Express + Mongoose backend
- MongoDB persistence
- CORS configuration
- Centralized frontend API service
- Create, read, update and delete tasks
- Loading states
- Error states for GET/POST/PUT/DELETE
- Delete confirmation
- Toast-style success/error notifications
- Refresh after successful writes
- Priority field
- Responsive UI

## Project structure

```text
24CS039_awdf_practical6/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── Toast.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Copy:

```text
.env.example
```

to:

```text
.env
```

For MongoDB Atlas:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/awdf_24cs039?retryWrites=true&w=majority
PORT=5000
```

Make sure MongoDB Atlas allows your IP address.

Then:

```bash
npm start
```

Expected backend:

```text
MongoDB connected
Jainam Khetani | 24CS039
API running on http://localhost:5000
```

## Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## API

```text
GET    http://localhost:5000/tasks
POST   http://localhost:5000/tasks
PUT    http://localhost:5000/tasks/:id
DELETE http://localhost:5000/tasks/:id
```

## End-to-end test

1. Start MongoDB / Atlas.
2. Start the backend on port 5000.
3. Start React on port 5173.
4. Create a task from the UI.
5. Confirm it appears in MongoDB.
6. Edit the task.
7. Delete the task after confirmation.
8. Refresh the browser.
9. Confirm the UI loads the current database state.

## GitHub

Recommended repository:

```text
task-manager-fullstack-24cs039
```

Suggested commit:

```text
feat: integrate React task UI with MongoDB backend
```

Do not commit `backend/.env`.

## Deployment

GitHub stores the code but does not run the Express backend. For deployment, host the backend on a Node.js service such as Render and the frontend on a static hosting service such as Vercel/Netlify. Set `MONGO_URI` and the frontend API URL as deployment environment variables.
