"use strict"

const CustomError = require("../helpers/customError");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const Token = require("../models/token");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

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

        const user = await User.findOne({ $or: [{ email }, { username }], password });
        if (!user) throw new CustomError("Incorrect email/username or password", 401)
        if (!user.isActive) throw new CustomError("This accounts is not active")

        //! --------------Simple Token Version--------------------
        let tokenData = await Token.findOne({ userId: user._id });

        if (!tokenData) {
            tokenData = await Token.create({
                userId: user._id,
                token: passwordEncrypt(Date.now() + user._id)
            })
        }

        //! ------------------------------------------------------
        /* -------------------------------------------------------------------------- */
        //* JWT TOKEN---------------------------------------------
        // Access Token:
        const accessData = {
            _id: user._id,
            username: user.username,
            isActive: user.isActive,
            isAdmin: user.isAdmin
        };

        // const accessToken = jwt.sign(payload, secretKey, {lifetime})
        const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '15m' });

        // Refresh Token:
        const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_KEY, { expiresIn: '1d' });
        //*-------------------------------------------------------

        res.status(200).send({
            error: false,
            baerer: {
                access: accessToken,
                refresh: refreshToken
            },
            message: "ok kanka girdin"
        })
    },




    logout: async (req, res) => {

        res.status(200).send({
            error: false,
            message: "ok kanka çıktın"
        })
    },
    refresh: async (req, res) => {

        res.status(200).send({
            error: false,
            message: "ok kanka refreshledin"
        })
    }
}