"use strict";

//! -------------------------------------------------------------------------- */
//*                   EXPRESS JS - BLOG Project with Mongoose                  */
//! -------------------------------------------------------------------------- */


const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

//! Parse data
app.use(express.json());

//! Caach async errors
require("express-async-errors");

// //? DB Connection
// const dbConnection = require("./src/dbConnection");
// dbConnection();
require("./src/dbConnection")();

/* -------------------------------------------------------------------------- */
//? Routes
/* -------------------------------------------------------------------------- */
app.all("/", (req, res) => res.send("Welcome to Blog API"));

app.use(require("./src/routes/blog.router"))




app.use(require("./src/middlewares/errorHandler"));
/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at http://127.0.0.1:` + PORT))