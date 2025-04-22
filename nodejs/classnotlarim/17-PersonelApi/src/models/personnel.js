"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const {mongoose}=require("../configs/dbConnection")
const passwordEncrypt=require("../helpers/passwordEncrypt")
/* ------------------------------------------------------- */

const PersonnelSchema=new mongoose.Schema({
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    username:{
        type:"String",
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:"String",
        trim:true,
        required:true,
        set:(password)=>passwordEncrypt(password)

    },

    firstname:{
        type:"String",
        trim: true,
        required: true
    },
    lastname:{
        type:"String",
        trim: true,
        required: true
    },
    phone:{
        type:"String",
        trim: true,
        required: true,
        unique:true,
        minlenght:11,
        math:[/^\d{11}$/, "Phone number is not valid"]
    },
    email:{
        type:"String",
        trim: true,
        required: true,
        unique:true,
        validate:[(email)=>email.includes("@") && email.includes("."), "email is not valid."]
    },
    title:{
        type: "String",
        trim:true,
        required: true,
    },
    salaray:{
        type: Number,
        default: 5000,
    },
    description:{
        type: "String",
        trim:true,
        required: true,
    },
    isActive:{
        type:Boolean,
        default: true
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    isLead:{
        type:Boolean,
        default: false
    },
    startedAt:{
        type: Date,
        default: Date.now(),
        required: true,
    }

},{collection:"personnels",timestamps:true})

module.exports= mongoose.model("Personnel", PersonnelSchema)