const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const Router = require('./route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: ["https://fullstack-ecommerce-responsive-mern-app-7dmc.vercel.app"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Use process.env.PORT for dynamic port assignment on platforms like Vercel
const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
    response.json({
        message: "Server running at port " + PORT,
        success: true
    });
});

// API endpoint
app.use('/api', Router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running at port ", PORT);
    });
});

// Example of exporting a handler function for serverless deployment (like Vercel)
module.exports.handler = async (event, context) => {
    try {
        // Your serverless function logic here
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Hello from serverless function!" })
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
