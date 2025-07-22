"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Brand = require("../models/brand");
const CustomError = require("../helpers/customError")

module.exports = {

    list: async (req, res) => {

        const result = await res.getModelList(Brand)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Brand),
            result
        });
    },

    create: async (req, res) => {

        const result = await Brand.create(req.body);

        res.status(200).send({
            error: false,
            result
        });
    },
    read: async (req, res) => {

        const result = await Brand.findById(req.params.id)

        res.status(200).send({
            error: false,
            result
        });
    },
    update: async (req, res) => {

        const result = await Brand.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })

        if (!result) throw new CustomError("Updated failed, not found or already updated.")

        res.status(200).send({
            error: false,
            result
        });
    },
    deletee: async (req, res) => {

        const result = await Brand.findByIdAndDelete(req.params.id)
        if (!result) throw new CustomError("Delete failed, not found or already deleted.")

        res.status(200).send({
            error: false,
            result
        });
    },
}