const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
                .catch((err) => next(err))
    }
}

export {asyncHandler}

// requestHandler(req, res, next): This executes your controller function, 
// passing along the standard Express req, res, and next arguments.

// Promise.resolve(...): Wraps the execution result inside a JavaScript Promise. 
// Even if you forget to write async in your controller, 
// this ensures the runtime safely treats the execution 
// as a Promise..catch((err) => next(err)): 
// This is the core magic. If your controller throws an error 
// (e.g., duplicate email validation failure), the Promise rejects. 

// .catch() intercepts that error and forwards it via next(err) 
// down the Express middleware execution line into a global error 
// handler instead of crashing the server.


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

// This commented code shows the Try-Catch approach. 
// It does the exact same job as your active Promise code 
// but uses explicit syntax blocks.