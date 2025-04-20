"use strict";


/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */

new mongoose.Schema({ fields }, { options });

const nameSchema = new mongoose.Schema({

    //_id: // auto created and increment

    fieldName: Number,
    fieldName2: Boolean,
    fieldName3: mongoose.Schema.Types.String,

    fieldName4: {
        type: String, // js data type,
        default: null,
        trim: true, // Cuts the space before & after
        unique: true,
        select: false,
        index: true,
        // required: true,
        required: [true, "Custom error message"],
    }


}, {

        collection: "collectionName", // Table name
        timestamps: true // createdAt & updatedAt
})