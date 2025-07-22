"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Product = require("../models/product");
const CustomError = require("../helpers/customError")

module.exports = {

    list: async (req, res) => {

        const result = await res.getModelList(Product)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Product),
            result
        });
    },

    create: async (req, res) => {

        const result = await Product.create(req.body);

        res.status(200).send({
            error: false,
            result
        });
    },
    read: async (req, res) => {

        const result = await Product.findById(req.params.id)

        res.status(200).send({
            error: false,
            result
        });
    },
    update: async (req, res) => {

        const result = await Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })

        if (!result) throw new CustomError("Updated failed, not found or already updated.")

        res.status(200).send({
            error: false,
            result
        });
    },
    deletee: async (req, res) => {

        const result = await Product.findByIdAndDelete(req.params.id)
        if (!result) throw new CustomError("Delete failed, not found or already deleted.")

        res.status(200).send({
            error: false,
            result
        });
    },
}