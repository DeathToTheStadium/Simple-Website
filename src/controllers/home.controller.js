const Pages = require("../models/page");
let renderhome = async function (req, res) {
  let home = await Pages.find();
  let HasCookie = false;
  try {
    console.log(home);
    res.render("index.ejs", {
      header: {
        title: "HOMEPAGE | Simple-Website",
      },
      page: home[0].Home,
      hascookie: req.hascookie,
    });
  } catch (error) {}
};

module.exports = [renderhome];
