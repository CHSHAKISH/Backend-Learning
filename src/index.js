// require('dotenv').config({path: './env'})

import dotenv from "dotenv";

// Purpose: Reads your hidden .env text file 
// and attaches its variables directly to Node's runtime 
// environment (process.env.VARIABLE_NAME). 
// This ensures database strings and secrets are hidden 
// from the codebase.

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// Purpose: Imports environment utilities, 
// Mongoose database engines, configuration constants, 
// the custom database connection script, 
// and the pre-configured Express app.

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 8000


connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${[port]}`)
    })
    // Purpose: Executes the database connection function 
    // (which is asynchronous). .then() ensures your API server 
    // never goes live or accepts web traffic 
    // until Node confirms a completely successful connection to MongoDB.
})
.catch((error) => {
    console.log("MongoDB connection failed !!!", error)
})

// Purpose: Safety net. If MongoDB is down, 
// password is wrong, or network fails, 
// this catches the error gracefully, 
// logs it to the terminal, 
// and prevents the app from cleanly starting.




/*
import express from "express";
const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`)
        })
    } catch(error) {
        console.error("ERROR: ", error)
        throw error
    }
})()
*/