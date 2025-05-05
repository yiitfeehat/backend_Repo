"use strict"

const CustomError = require("../helpers/customError");

/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

module.exports = {
    login: async (req, res) => {

        /*
           #swagger.tags = ["Authentication"]
           #swagger.summary = "Login"
           #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
           #swagger.parameters["body"] = {
               in: "body",
               required: true,
               schema: {
                   "username": "test",
                   "password": "aA12345.?",
               }
           }
       */

        const { username, email, password } = req.body;

        if (!((email || username) && password)) {
            // res.ErrorStatusCode = 401;
            // throw new Error("username/email and password are required")
            throw new CustomError("username/email and password are required", 401)
        }

        res.status(200).send({
            error: false,
            message: "ok kanka"
        })
    },
    logout: async (req, res) => {

        res.status(200).send({
            error: false,
            message: "ok kanka"
        })
    },
    refresh: async (req, res) => {

        res.status(200).send({
            error: false,
            message: "ok kanka"
        })
    }
}