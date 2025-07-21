import express from "express"
//const express = require('express') means the same thing
import cors from "cors"
import dotenv from "dotenv"

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config()

//1. setup app server and port
const app = express()
const port = process.env.PORT


app.use(cors({
    origin: "http://localhost:5173"
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

// if we connect to DB, then we can run server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`running on PORT: ${port}`)
    })
})