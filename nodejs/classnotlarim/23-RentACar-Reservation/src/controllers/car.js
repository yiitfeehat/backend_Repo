"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Car Controller

// Models & Helpers
const Car = require("../models/car");
const Reservation = require("../models/reservation");
const dateValidation = require("../helpers/dateValidation");

module.exports = {
    // 🚗 List Available Cars in Given Date Range
    list: async (req, res, next) => {
        /*
          #swagger.tags = ["Cars"]
          #swagger.summary = "List Cars"
          #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
              <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
              <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
              <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
          `
        */

        try {
            let customFilter = { isAvailable: true };

            const { startDate, endDate } = req.query;

            // Tarih kontrolü yapılmazsa aşağıdaki sorgu boşa dönebilir
            if (!startDate || !endDate) {
                res.errorStatusCode = 400;
                throw new Error("ValidationError: 'startDate' and 'endDate' are required.");
            }

            // Tarih doğrulaması
            dateValidation(startDate, endDate);

            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);

            // Verilen tarih aralığında zaten rezerve edilmiş araç ID'lerini bul
            const reservedCarIds = await Reservation.find(
                {
                    startDate: { $lte: endDateObj },
                    endDate: { $gte: startDateObj }
                },
                { carId: 1, _id: 0 }
            ).distinct("carId");

            // Bu araçları hariç tut
            customFilter._id = { $nin: reservedCarIds };

            // Listele
            const data = await res.getModelList(Car, customFilter, ["createdId"], ["updatedId"]);
            console.log("Rezerve Araçlar:", reservedCarIds);

            res.status(200).send({
                error: false,
                details: await res.getModelListDetails(Car, customFilter),
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
            // Güvenlik için manuel gelen ID'leri sil
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
            res.errorStatusCode = 400;
            next(err);
        }
    }

    ,

    read: async (req, res) => {
        /*
         #swagger.tags = ["Cars"]
         #swagger.summary = "Get Single Car"
     */


        const data = await Car.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/Car"
                }
            }
        */


        const data = await Car.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Car.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
        #swagger.tags = ["Cars"]
        #swagger.summary = "Delete Car"
    */

        const data = await Car.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },
}