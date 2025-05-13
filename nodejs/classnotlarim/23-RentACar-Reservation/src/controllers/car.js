"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Car Controller

// Models & Helpers
const Car = require("../models/car");
const Reservation = require("../models/reservation");
const dateValidation = require("../helpers/dateValidation");
const CustomError = require("../errors/customError");

module.exports = {
    // 🚗 List Available Cars in Given Date Range
    list: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "List Cars"
            #swagger.description = `
                List cars with optional search, sort, pagination.
                <ul> Examples:
                    <li>?search[field1]=value1&search[field2]=value2</li>
                    <li>?sort[field1]=1&sort[field2]=-1</li>
                    <li>?page=2&limit=10</li>
                </ul>
            `
        */
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                throw new CustomError("ValidationError: 'startDate' and 'endDate' are required.", 400);
            }

            dateValidation(startDate, endDate);

            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            // Find reserved car IDs for given date range
            const reservedCarIds = await Reservation.find(
                {
                    startDate: { $lte: endDateObj },
                    endDate: { $gte: startDateObj }
                },
                { carId: 1 }
            ).distinct("carId");

            const filter = {
                isAvailable: true,
                _id: { $nin: reservedCarIds }
            };

            const data = await res.getModelList(Car, filter, [
                { path: "createdId", select: "username" },
                { path: "updatedId", select: "username" }
            ]);

            res.status(200).send({
                error: false,
                details: await res.getModelListDetails(Car, filter),
                data
            });

        } catch (err) {
            res.errorStatusCode = res.errorStatusCode || 500;
            next(err);
        }
    },

    // 🚗 Create a New Car
    create: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Car" }
            }
        */
        try {
            delete req.body.createdId;
            delete req.body.updatedId;

            const data = await Car.create({
                ...req.body,
                createdId: req.user._id,
                updatedId: req.user._id
            });

            res.status(201).send({
                error: false,
                message: "Car created successfully.",
                data
            });

        } catch (err) {
            next(new CustomError(`${err}`, 400));
        }
    },

    // 🚗 Get a Single Car
    read: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Get Single Car"
        */
        try {
            const data = await Car.findById(req.params.id);

            if (!data) {
                throw new CustomError("Car not found", 404);
            }

            res.status(200).send({
                error: false,
                data
            });
        } catch (err) {
            next(err);
        }
    },

    // 🚗 Update a Car
    update: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Car" }
            }
        */
        try {
            const updated = await Car.updateOne(
                { _id: req.params.id },
                req.body,
                { runValidators: true }
            );

            const newData = await Car.findById(req.params.id);

            res.status(202).send({
                error: false,
                data: updated,
                new: newData
            });
        } catch (err) {
            next(new CustomError(`${err}`, 400));
        }
    },

    // 🚗 Delete a Car
    delete: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */
        try {
            const result = await Car.deleteOne({ _id: req.params.id });

            res.status(result.deletedCount ? 204 : 404).send({
                error: !result.deletedCount,
                data: result
            });
        } catch (err) {
            next(err);
        }
    }
};
