"use strict"

/* -------------------------------------------------------------------------- */
/*                   EXPRESS JS - BLOG Project with Mongoose                  */
/* -------------------------------------------------------------------------- */

// Mongoose ODM

const mongoose = require("mongoose");

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL) // Default DB name -> test
        .then(() => console.log("* DB Connected *"))
        .catch((err) => console.log("--- DB Not Connected ---", err))
}
 
module.exports= dbConnection;