"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require('../models/user');
const CustomError = require('../helpers/customError');

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

        const result = await res.getModelList(User);

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(User),
            result
        });
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

        const result = await User.create(req.body);

        res.status(201).send({
            error: false,
            result
        });
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

        const result = await User.findById(req.params.id);

        res.status(200).send({
            error: false,
            result
        });
    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "firstName": "test",
                    "lastName": "test",
                }
            }
        */

        const result = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true });

        if (!result) throw new CustomError("Update failed, data is not found or already updated", 404);

        res.status(202).send({
            error: false,
            result
        });
    },

    deletee: async (req, res) => {
        /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

        const result = await User.findByIdAndDelete(req.params.id)

        if (!result) throw new CustomError("Delete failed, data is not found or already deleted", 404);

        res.status(200).send({
            error: false,
            result
        });
    },
}