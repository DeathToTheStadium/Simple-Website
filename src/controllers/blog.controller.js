const res = require("express/lib/response");
const monogoose = require("mongoose");
const Schema = require("../models/article");

/* rember to create some dynamic ajax calls that checks if a title is unique or not to avoid errors on 
    slug creation
*/

let renderblog = async function (req, res) {
  let articles = await Schema.find();
  res.render("blog.ejs", {
    header: {
      title: "BLOG | Simple-Website",
    },
    blog: {
      content: articles,
    },
    hascookie: req.hascookie,
  });
};

let renderarticle = async function (req, res) {
  let article = await Schema.findOne().where({ slug: req.params.id });
  res.render("article.ejs", {
    header: {
      title: "BLOG | Simple-Website",
    },
    blog: {
      content: article,
    },
    hascookie: req.hascookie,
  });
};

module.exports = [renderblog, renderarticle];
