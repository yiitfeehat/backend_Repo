"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Personnel = require("../models/personnel")

module.exports = {

    login: async (req, res) => {

        const { username, email, password } = req.body;


        if ((username && password) || (email && password)) {

            const user = await Personnel.findOne({ $or: [{ username: username }, { email: email }] })

            res.status(200).send({
                error: false,
                message: "OK"

            })
        } else {
            res.errorStatusCode = 401;
            throw new Error("username or email and password required")
        }
    },
    logout: async (req, res) => {

    }

}
