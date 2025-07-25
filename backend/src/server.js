import express from "express"
//const express = require('express') means the same thing
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config()

//1. setup app server and port
const app = express()
const port = process.env.PORT || 5001
const __dirname = path.resolve()

const allowedOrigins = [
  "http://localhost:5173",
  process.env.VITE_API_URL,
]

app.use(cors({
  origin: allowedOrigins,
}))


// middleware - will parse JSON bodies (req/res.body)
//could not get title and content for notesController without this 
app.use(express.json())
// prevents high traffic server issues
app.use(rateLimiter)

app.use((req,res,next) =>{
    console.log(`Req method: ${req.method}, Req URL: ${req.url}`)
    next()
})

//2. call all API services needed (only notes for this)
app.use("/api/notes", notesRoutes)
//ex: app.use("/api/emails", emailRoutes)
//ex: app.use("/api/payments", paymentsRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

// if we connect to DB, then we can run server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`running on: ${allowedOrigins}`)
    })
})