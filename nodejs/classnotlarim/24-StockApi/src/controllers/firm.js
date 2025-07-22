"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Firm = require("../models/firm");
const CustomError = require("../helpers/customError")

module.exports = {

    list: async (req, res) => {

        const result = await res.getModelList(Firm)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Firm),
            result
        });
    },

    create: async (req, res) => {

        const result = await Firm.create(req.body);

        res.status(200).send({
            error: false,
            result
        });
    },
    read: async (req, res) => {

        const result = await Firm.findById(req.params.id)

        res.status(200).send({
            error: false,
            result
        });
    },
    update: async (req, res) => {

        const result = await Firm.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })

        if (!result) throw new CustomError("Updated failed, not found or already updated.")

        res.status(200).send({
            error: false,
            result
        });
    },
    deletee: async (req, res) => {

        const result = await Firm.findByIdAndDelete(req.params.id)
        if (!result) throw new CustomError("Delete failed, not found or already deleted.")

        res.status(200).send({
            error: false,
            result
        });
    },
}