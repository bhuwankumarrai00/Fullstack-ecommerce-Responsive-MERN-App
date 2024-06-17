const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConnect')
const Router = require('./route')
const cookiesParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = 8080

app.get("/",(request,response)=>{
    response.json({
        message : "Server runnning at " + PORT,
        success : true
    })
})

//api enpoint
app.use('/api',Router)


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server running at port ", PORT )
    })
})

// Example of exporting a handler function
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
