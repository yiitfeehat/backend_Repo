"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
 $ npm i express dotenv express-async-errors
 $ npm i sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json())

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})

/* ------------------------------------------------------- */
// MODELS:

//Sequelize:

const { Sequelize, DataTypes } = require("sequelize");
// Sequelize instance oluştur:
const sequelize = new Sequelize("sqlite:" + process.env.SQLITE)

// define methodu sequelize modeli oluşturur:
// her bir model, veritabanında bir tabloya denk gelir.
// sequelize.define('tableName', {  modelDetails  })

const Todo = sequelize.define("todos", {

    // ilk sutun olarak ID tanımlamaya gerek yoktur. Sequelize otomatik tanımlar/yönetir.
    // id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false, // default: true // data boş olabilir mi?
    //     unique: true, // default: false // tekrar eden kayıt engellensin mi? (benzersiz)
    //     comment: 'description',
    //     primaryKey: true, // default: false
    //     autoIncrement: true, // default: false // her yeni kayıt otomatik olarak +1 eklensin mi?
    //     defaultValue: 'default', // data gönderilmediğinde varsayılan olarak ne yazılsın?
    //     // field: 'customName',
    // },

    title: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    description: DataTypes.STRING, //? Shorhand using. / Tek parametre yazılcaksa.

    priority: {
        type: DataTypes.TINYINT,
        allowNull: false,
        default: false
    },

    isDoneCustom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    }

    // createdAt ve updatedAt tanımlamaya gerek yoktur sequelize otomatik olarak tanımlar/yönetir.

    // createdAt: false, //disable
    // updatedAt: false, //disable
})

// Syncronization:
//* Sync komutları ihtiyaca göre "1" defa çalıştırdıktan sonra yorum alınması unutulmasın.
// Model bilgilerini db'ye uygula:
// sequelize.sync() // CREATE TABLE IF NOT EXISTS
// sequelize.sync({ force: true }) // DROP TABLE & CREATE TABLE IF NOT EXISTS
// sequelize.sync({ alter: true }) // TO BACKUP & DROP TABLE & CREATE TABLE IF NOT EXISTS & FROM BACKUP

// Connect to DB:
sequelize.authenticate()
    .then(() => console.log('* DB Connected.'))
    .catch(() => console.log('* DB Not Connected.'))

/* ------------------------------------------------------- */
// ROUTERS:


/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));