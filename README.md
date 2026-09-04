# Student Management System

A full-stack web application for managing students and courses. The system provides a simple dashboard and allows users to add, view, update, and delete student and course records.

## Features

- Dashboard with student and course statistics
- Student management
  - Add students
  - View students
  - Update student details
  - Delete students
  - Active/Inactive status
- Course management
  - Add courses
  - View courses
  - Update course details
  - Delete courses
  - Active/Inactive status
- Course selection when adding or updating students
- Prevents deletion of courses that have enrolled students
- Search functionality
- Responsive user interface
- RESTful API
- MongoDB database integration

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB

### Other
- REST API
- CORS
- Font Awesome

## Project Structure

```text
StudentManagementSystem/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── index.mjs
│       ├── models/
│       │   ├── course.mjs
│       │   └── student.mjs
│       └── routes/
│           ├── courseRoutes.mjs
│           └── studentRoutes.mjs
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md