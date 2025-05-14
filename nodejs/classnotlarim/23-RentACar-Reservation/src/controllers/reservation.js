"use strict";
const CustomError = require('../errors/customError');
const Reservation = require('../models/reservation');
const Car = require('../models/car'); // Missing Car model import
const dateValidation = require('../helpers/dateValidation');

/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

// Reservation Controller
module.exports = {

    // 🚗 List Reservations
    list: async (req, res, next) => {
        /*
         #swagger.tags = ["Reservations"]
         #swagger.summary = "List Reservations"
         #swagger.description = `
             You can send query with endpoint for search[], sort[], page, and limit.
             <ul> Examples:
                 <li>?search[field1]=value1&search[field2]=value2</li>
                 <li>?sort[field1]=1&sort[field2]=-1</li>
                 <li>?page=2&limit=1</li>
             </ul>
         `
        */
        try {
            // If the user is neither Admin nor Staff, filter by userId
            const isAdmin = req.user?.isAdmin === true;
            const isStaff = req.user?.isStaff === true;

            const customFilter = (!isAdmin && !isStaff) ? { userId: req.user._id } : {};

            const data = await res.getModelList(Reservation, customFilter, [
                { path: "userId", select: "username firstName lastName" },
                { path: "carId", select: "brand model" }
            ]);

            res.status(200).send({
                error: false,
                details: await res.getModelListDetails(Reservation, customFilter),
                data
            });
        } catch (err) {
            next(err); // Passing error to the error handler middleware
        }
    },

    // 🚗 Create a Reservation
    create: async (req, res, next) => {
        /*
           #swagger.tags = ["Reservations"]
           #swagger.summary = "Create Reservation"
           #swagger.parameters['body'] = {
               in: 'body',
               required: true,
               schema: { $ref: "#/definitions/Reservation" }
           }
        */
        try {
            // Assigning userId to body based on user role
            if (!req.user.isAdmin && !req.user.isStaff) {
                req.body.userId = req.user._id; // Regular user is booking for themselves
            } else if (!req.body.userId) {
                req.body.userId = req.user._id; // If no userId provided, use current user's ID
            }

            // Validate startDate and endDate
            const [startDate, endDate, reservedDays] = dateValidation(req.body?.startDate, req.body?.endDate);

            console.log("startDate:", startDate);
            console.log("endDate:", endDate);


            // Eğer reservedDays geçerli değilse hata fırlat
            if (!reservedDays || isNaN(reservedDays)) {
                throw new CustomError("Invalid reservation days", 400);
            }

            // Check if the car is reserved for the given dates
            const reservedCarIds = await Reservation.find({
                carId: req.body.carId,
                startDate: { $lte: endDate },
                endDate: { $gte: startDate }
            });

            console.log("reservedCarIds", reservedCarIds);

            if (reservedCarIds.length > 0) {
                throw new CustomError("The car is already reserved for the given dates", 400);
            }

            // Check if the user has any other reservation during the given dates
            const userReservedCarInDates = await Reservation.find({
                userId: req.body.userId,
                startDate: { $lte: endDate },
                endDate: { $gte: startDate }
            });

            if (userReservedCarInDates.length > 0) {
                throw new CustomError("This user has already reserved a car in the given days", 400);
            }

            // Get the car's price per day and calculate the amount
            const car = await Car.findById(req.body?.carId).select('pricePerDay');
            const dailyCost = car ? Number(car.pricePerDay) : 0;
            console.log("car:", car)

            if (dailyCost === 0) {
                throw new CustomError("Car not found or invalid pricing", 404);
            }

            req.body.amount = dailyCost * reservedDays;

            // Create reservation
            const data = await Reservation.create(req.body);

            res.status(201).send({
                error: false,
                data
            });

        } catch (err) {
            next(err); // Pass the error to error handler middleware
        }
    },

    // 🚗 Get a Single Reservation
    read: async (req, res, next) => {
        /*
         #swagger.tags = ["Reservations"]
         #swagger.summary = "Get Single Reservation"
        */
        try {
            const customFilter = !req.user.isAdmin && !req.user.isStaff ? { userId: req.user._id } : {};

            const data = await Reservation.findOne({ _id: req.params.id, ...customFilter })
                .populate([
                    { path: "userId", select: "username firstName lastName" },
                    { path: "carId", select: "brand model" },
                    { path: "createdId", select: "username" },
                    { path: "updatedId", select: "username" }
                ]);

            if (!data) {
                throw new CustomError("Reservation not found", 404);
            }

            res.status(200).send({
                error: false,
                data
            });
        } catch (err) {
            next(err); // Pass the error to the error handler middleware
        }
    },

    // 🚗 Update a Reservation
    update: async (req, res, next) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/Reservation" }
            }
        */
        try {
            const updated = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true });

            if (!updated.modifiedCount) {
                throw new CustomError("Reservation update failed", 400);
            }

            const newData = await Reservation.findById(req.params.id);

            res.status(202).send({
                error: false,
                message: "successfully.",
                data: updated,
                new: newData
            });
        } catch (err) {
            next(err); // Pass the error to the error handler middleware
        }
    },

    // 🚗 Delete a Reservation
    delete: async (req, res, next) => {
        /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */
        try {
            const result = await Reservation.deleteOne({ _id: req.params.id });

            if (!result.deletedCount) {
                throw new CustomError("Reservation not found or already deleted", 404);
            }

            res.status(204).send({
                error: false,
                message: "Reservation successfully deleted"
            });

        } catch (err) {
            next(err); // Pass the error to error handler middleware
        }
    }
};
