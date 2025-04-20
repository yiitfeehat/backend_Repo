"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();
const BlogCategory = require("../controllers/blog.controller");
/* -------------------------------------------------------------------------- */

// URL: /blogs ->

router.route("/blogs").get(BlogCategory.list).post(BlogCategory.create);
router
    .route("/blogs/:id")
    .get(BlogCategory.read)
    .put(BlogCategory.update)
    .delete(BlogCategory.delete);

module.exports = router;