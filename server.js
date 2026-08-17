const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Body Parser and CORS Middleware
app.use(cors());
app.use(express.json());

// API Base Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Task Manager API',
    documentation: 'See README.md for complete Postman API usage'
  });
});

// Task Routes
app.use('/api/tasks', taskRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
