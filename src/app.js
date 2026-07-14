import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

// Purpose: Imports core framework dependencies 
// and triggers express(), which creates your 
// central HTTP server routing instance (app).


app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

// Purpose: Safety feature. 
// Tells the browser which frontend domains 
// (like a React app on localhost:3000) are allowed 
// to make requests to this backend.


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// Purpose: These are your built-in body parsers. 
// They grab raw HTTP request streams coming from the frontend, 
// verify they are under 16 kilobytes (to protect against 
// Denial-of-Service attacks filling up server memory), 
// convert them into objects, and glue them to req.body.

app.use(express.static("public"))

// Purpose: Configures a dedicated local storage folder (public). 
// If someone requests an asset directly 
// (like http://localhost:8000/avatar.png), 
// Express searches this directory automatically 
// to serve static files (like images, PDFs, or uploads)


app.use(cookieParser())

// Purpose: Activates the third-party cookie middleware. 
// It scans request headers for browser cookies, 
// decodes them, and populates req.cookies.



// Routes import
import userRouter from "./routes/user.routes.js"

// Routes declaration
app.use("/api/v1/users", userRouter)

// Purpose: Modularity mapping. Instead of writing 50 user-related endpoints 
// directly in app.js, this maps any request starting with /api/v1/users 
// over to a clean, isolated routing file (user.routes.js) to process further.

// http://localhost:8000/api/v1/users/register
// http://localhost:8000/api/v1/users/login

export { app }

// Purpose: Packs up this fully configured app module 
// so it can be imported and turned on back inside index.js
