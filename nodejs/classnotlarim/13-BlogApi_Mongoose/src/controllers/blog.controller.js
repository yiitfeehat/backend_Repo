"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
//? Call Models:

const { BlogCategory, BlogPost } = require("../models/blog.model")

/* -------------------------------------------------------------------------- */

// Controllerı yazıyorum

module.exports = {

    list : async (req, res) => {
        const result = await BlogCategory.find();

        res.status(200).send({
            error: false,
            result
        });
    },
    create : async (req, res) => {
        const result = await BlogCategory.create(req.body);

        res.status(200).send({
            error: false,
            result
        });
    },
    read: async (req, res) => {
        const result = await BlogCategory.findById(req.params.id);
    
        res.status(200).send({
            error: false,
            result
        });
    },
    
    update : async (req, res) => {
        const result = await BlogCategory.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.status(200).send({
            error: false,
            result
        });
    },
    delete : async (req, res) => {
        const result = await BlogCategory.findByIdAndDelete(req.params.id);
        
        res.status(200).send({
            message: "Bravo yok ettin ya helal valla adamsın nasıl yaptın ya",
            error: false,
            result
        });
    },



};
