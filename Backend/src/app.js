const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}))

// Require all the routes here
const authRouter = require("./routes/auth.route.js")
const interviewRouter = require("./routes/interview.routes.js")


// using all the routes here
app.use("/api/auth" , authRouter)
app.use("/api/interview" , interviewRouter)

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: err.toString()
    });
});

module.exports = app