const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const Router = require('./route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Adjust as per your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API endpoint
app.use('/api', Router);

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connected");

    // Set up server to listen
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log("Server running at port ", PORT);
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Export app for serverless deployment (if needed)
module.exports = app;
