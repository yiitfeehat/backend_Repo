"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();
const BlogCategory = require("../controllers/blog.controller");
/* -------------------------------------------------------------------------- */

// URL: /blogs ->

router.route("/blogs").get(BlogCategory.list).post(BlogCategory.create);

module.exports = router;