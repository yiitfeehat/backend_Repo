"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const BlogPost = require("../../models/blogPostModel");
const BlogCategory = require('../../models/blogCategoryModel');
const removeQueryParam = require("../../helpers/removeQueryParam");

// ------------------------------------------
// BlogPost
// ------------------------------------------

module.exports = {
  list: async (req, res) => {
    const [posts, recentPosts, categories, details] = await Promise.all([
      res.getModelList(BlogPost, { isPublished: true }, "blogCategoryId"),
      BlogPost.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3),
      BlogCategory.find(),
      res.getModelListDetails(BlogPost, { isPublished: true }),
    ]);

    let pageUrl = '';
    const queryString = req.originalUrl.split('?')[1];
    if (queryString) pageUrl = removeQueryParam(queryString, 'page');
    pageUrl = pageUrl ? "&" + pageUrl : '';


    res.render('index', { categories, posts, recentPosts, details, pageUrl });
  },

  create: async (req, res) => {
    const data = await BlogPost.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    // req.params.postId
    // const data = await BlogPost.findById(req.params.postId)
    const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId",
    ); // get Primary Data

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await BlogPost.findByIdAndUpdate(req.params.postId, req.body, { new: true }) // return new-data
    const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      req.body,
      { runValidators: true },
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },

  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
