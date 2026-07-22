const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()
const connectToDB = require("./config/database.js")

// Ensure database connection is alive on every request for serverless
app.use(async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (error) {
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true 
}))

// Require all the routes here
const authRouter = require("./routes/auth.route.js")
const interviewRouter = require("./routes/interview.routes.js")


// using all the routes here
app.use("/api/auth" , authRouter)
app.use("/api/interview" , interviewRouter)

// Root route for health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "Interview AI Backend is running successfully!" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: err.toString()
    });
});

module.exports = app