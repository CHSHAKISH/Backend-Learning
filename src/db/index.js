// This file uses an asynchronous function 
// wrapped in a try...catch block to securely connect 
// your Express application to your MongoDB database.


import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

// import mongoose, { mongo } from "mongoose";: 
// This loads the Mongoose library, which is an Object Data Modeling (ODM) 
// tool. It acts as a bridge, allowing your Node.js code to talk to MongoDB 
// using JavaScript objects. (Note: You imported { mongo } as well, 
// but we are not using it here; 



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}/${DB_NAME}`)

        console.log(`\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection FAILED", error)
        process.exit(1)
    }

    // process.exit(1): This is a built-in Node.js command 
    // that instantly forces the entire Node application 
    // process to shut down. The number 1 means the application 
    // exited due to an unhandled system failure. Why do this? 
    // Because if your database is broken, your application 
    // cannot read or write data, making it useless to keep running.
}

export default connectDB

// const connectDB = async () => {: 
// This creates an asynchronous arrow function. 
// Database connections take time to travel across the network, 
// so this must be an async function 
// so we can use the await keyword inside it.


// try {: This starts a safety wrapper. 
// Any code inside the try block is executed normally. 
// If the database connection encounters an error 
// (like a wrong password or network loss), 
// JavaScript instantly stops executing the try block and 
// jumps straight to the catch block below.

