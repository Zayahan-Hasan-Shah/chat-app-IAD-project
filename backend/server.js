// const express = require("express")
// const dotenv = require("dotenv")
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import usersRoutes from "./routes/userRoutes.js"
import connectToMongoDB from "./db/ConnectingToDb.js"
import {app, server} from "./socket/socket.js"

const PORT = process.env.PORT || 8080

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", usersRoutes)

app.get("/", (req,res)=> res.send("Hello"))

server.listen(PORT, () =>{
    connectToMongoDB()
    console.log(`Server is running on ${PORT}`)
})