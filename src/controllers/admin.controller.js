const monogoose = require("mongoose");
const Schema = require("../models/article");
const page = require("../models/page");
const bcrypt = require("bcrypt");

const { marked } = require("marked");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

async function hashpassword() {
  const user = "DeathToTheStadium@gmail.com";
  const password = await bcrypt.hash("test", 5);
  console.log(password);
  return { user, password };
}

let createArticle = async function (req, res) {
  res.render("create.ejs", {
    header: {
      title: " CREATE | Simple-Website",
    },
    body: {
      form: {
        action: "/admin/save",
        method: "post",
        title: "The Main Title",
        description: "write a winning description :)",
        author: "Who Authored This Post",
        markdown: "# Markdown Goes here :)",
        button: "Create Article",
      },
    },
    hascookie: req.hascookie,
  });
};
let saveArticle = async function (req, res) {
  console.log(req.body);
  try {
    let article = new Schema({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      createdAt: new Date(),
      pictureUrl: "",
      markdown: req.body.markdown,
    });
    await article.save();
    res.redirect(`/blog/article/${article.slug}`);
  } catch (error) {
    console.log(error);
    console.log("oops Something went wrong");
    res.status(500).render("500.ejs", {
      header: "ERROR | Simple Website",
    });
  }
};
let editArticle = async function (req, res) {
  let article = await Schema.findOne().where({ slug: req.params.id });
  res.render("update.ejs", {
    header: {
      title: " Update | Simple-Website",
    },
    body: {
      form: {
        header: "Update",
        action: "/admin/update/" + article._id,
        method: "post",
        title: article.title,
        description: article.description,
        author: article.author,
        markdown: article.markdown,
        button: "Update Article",
      },
    },
    hascookie: req.hascookie,
  });
};
let updateArticle = async function (req, res) {
  let article = await Schema.findOne().where({ _id: `${req.params.objectId}` });
  console.log(req.body, req.params);
  article.title = req.body.title;
  article.description = req.body.description;
  article.author = req.body.author;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  await article.save();
  res.redirect("/blog/article/" + article.slug);
};
let deleteArticle = async function (req, res) {
  let article = Schema;
  await article.deleteOne().where({ _id: req.params.objectId });
  res.render("deleted.ejs", {
    header: {
      title: " FORM | Simple-Website",
    },
    hascookie: req.hascookie,
  });
};
let admin = async function (req, res) {
  try {
    let articles = await Schema.find();
    let pages = await page.find();
    res.render("admin.ejs", {
      header: {
        title: "FORM | Simple-Website",
      },
      homepage: pages[0].Home,
      aboutpage: pages[0].About,
      blog: {
        content: articles,
      },
      hascookie: req.hascookie,
    });
  } catch (error) {}
};
let login = async function (req, res) {
  if (req.cookies.auth) {
    res.redirect("/admin");
  } else {
    res.render("login-form.ejs", {
      header: {
        title: " LOGIN | Simple-Website",
      },
      hascookie: req.hascookie,
    });
  }
};
let authorize = async function (req, res) {
  if (req.body.username && req.body.password) {
    const data = await hashpassword();
    if (
      req.body.username === data.user &&
      bcrypt.compare(req.body.password, data.password)
    ) {
      console.log("Your in");

      res
        .status(200)
        .cookie("auth", { maxAge: 1000 * 60 * 10, path: "/admin" })
        .redirect("/admin");
    } else {
      console.log("wrong password");
      res.send("wrong password");
    }
  }
};

let homeUpdate = async function (req, res) {
  console.log("This is the Req body /n" + `${req.body.welcome_title}`);
  page.findByIdAndUpdate(
    { _id: `624a96c564d89446deb37558` },
    {
      Home: {
        welcome: {
          title: req.body.welcome_title,
          description: req.body.welcome_description,
        },
        sections: {
          boxOne: {
            title: req.body.section_title_1,
            description: req.body.section_description_1,
          },
          boxTwo: {
            title: req.body.section_title_2,
            description: req.body.section_description_2,
          },
          boxThree: {
            title: req.body.section_title_3,
            description: req.body.section_description_3,
          },
        },
      },
    },
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).render("500.ejs");
      } else {
        console.log(result);
        res.redirect("/admin");
      }
    }
  );
};

let aboutUpdate = async function (req, res) {
  page.findByIdAndUpdate(
    { _id: `624a96c564d89446deb37558` },
    {
      About: {
        mantra: req.body.about_mantra,
        title: req.body.about_title,
        content: req.body.about_content,
      },
    },
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).render("500.ejs");
      } else {
        console.log(result);
        res.redirect("/admin");
      }
    }
  );
};

let logout = async function (req, res) {
  if (req.cookies.auth) {
    res.clearCookie("auth", { path: "/" });
  }
  res.status(200).redirect("/admin/login");
};
module.exports = [
  admin,
  createArticle,
  saveArticle,
  editArticle,
  updateArticle,
  deleteArticle,
  login,
  authorize,
  homeUpdate,
  aboutUpdate,
  logout,
];
