`use strict`;
const lua_utility = require("./src/classes/lua-utility.js");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const app = express();
const routes = require("./src/loaders/express.loader");
const passport = require("passport");
const session = require("express-session");
const cookie_parser = require("cookie-parser");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");

mongoose.connect("mongodb://localhost/testdb");
// const connection = mongoose.createConnection('mongodb://localhost/testdb')
const variables = {
  port: 3000,
  message: "Listening on port :",
};

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(
  session({
    secret: "interesting starts",
    resave: false,
    store: mongoStore.create({ mongoUrl: "mongodb://localhost/test-app" }),
    cookie: {
      maxAge: 24 * (60 * (60 * 1000)),
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./src/public")));
app.use(expressLayouts);
app.use(cookie_parser());
app.use(function (req, res, next) {
  req.hascookie = false;
  if (req.cookies.auth) {
    req.hascookie = true;
  }
  return next();
});
routes.then(function (routes) {
  console.log(routes, "im in the index file");
  for (const key in routes) {
    if (Object.hasOwnProperty.call(routes, key)) {
      const router = routes[key];
      console.log(key);
      app.use(`/${key}`, router);
    }
  }
  // Load in our 404 page after every router has loaded
  app.use("*", function (req, res, next) {
    res.status(404).render("404.ejs", {
      header: { title: "404 Error Page | Simple Website" },
    });
    next();
  });
});

app.get("/", function (req, res) {
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }

  req.session.save();
  console.log(req.session.viewCount);
  res.redirect("/home");
});

// app.get('/home',function(req,res){
//     res.render('index',{
//         header:{
//             title:'HOMEPAGE | Simple-Website'
//         }
//     })
// })

// app.get('/about',function(req,res){
//     res.render('about',{
//         header:{
//             title:'ABOUT | Simple-Website'
//         }
//     })
// })

// app.get('/blog',function(req,res){
//     res.render('blog',{
//         header:{
//             title:'BLOG | Simple-Website'
//         }
//     })
// })

app.listen(variables.port, () => {
  console.log(`${variables.message}${variables.port}`);
});
