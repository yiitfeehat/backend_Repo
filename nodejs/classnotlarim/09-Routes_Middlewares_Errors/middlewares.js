"use strict"

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT ?? 8000;

/* -------------------------------------------------------------------------- */

//* Middleware is a function and must have three parameters.

// app.get("/", (req, res, next) => {

// console.log("Middleware worked.");

// res.send({
//     message: "This is from middleware"
// })

// next(); //go t onext route or middleware.

//! After next you cant use any other function.


// })



// app.get("/", (req, res) => {
//     console.log("Main Route");

//     res.send({
//         message: "Welcome"
//     })
// })

//! -------------------------------------------------------------------------- */











//! -------------------------------------------------------------------------- */

app.listen(PORT, () => console.log(`Running at: http://127.0.0.1:` + PORT))