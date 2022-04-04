let renderabout = function (req, res) {
  res.render("about.ejs", {
    header: {
      title: "ABOUT | Simple-Website",
    },
    hascookie: req.hascookie,
  });
};

module.exports = [renderabout];
