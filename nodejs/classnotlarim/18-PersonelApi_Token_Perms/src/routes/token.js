"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
const { list, read, update, create, deletee} = require("../controllers/token")
/* ------------------------------------------------------- */

router.route("/").get(list).post(create)

router.route("/:id")
    .get(read)
    .put(update)
    .patch(update)
    .delete(deletee)


/* ------------------------------------------------------ */
module.exports = router