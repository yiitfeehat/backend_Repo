"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require("../models/user");
const CustomError = require("../helpers/customError")

module.exports = {

    list: async (req, res) => {

        const result = await res.getModelList(User)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            result
        });
    },

    create: async (req, res) => {

        const result = await User.create(req.body);

        res.status(200).send({
            error: false,
            result
        });
    },
    read: async (req, res) => {

        const result = await User.findById(req.params.id)

        res.status(200).send({
            error: false,
            result
        });
    },
    update: async (req, res) => {

        const result = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })

        if (!result) throw new CustomError("Updated failed, not found or already updated.")

        res.status(200).send({
            error: false,
            result
        });
    },
    deletee: async (req, res) => {

        const result = await User.findByIdAndDelete(req.params.id)
        if (!result) throw new CustomError("Delete failed, not found or already deleted.")

        res.status(200).send({
            error: false,
            result
        });
    },
}