const express = require("express");
const router = express.Router();
let authCheck = async function (req, res, next) {
  if (req.cookies.auth) {
    next();
  } else {
    res.status().redirect("/admin/login");
  }
};
const controller = require("../controllers/admin.controller");
router.get("/", authCheck, controller[0]);
router.get("/create", authCheck, controller[1]);
router.post("/save", authCheck, controller[2]);
router.get("/edit/:id", authCheck, controller[3]);
router.post("/update/:objectId", authCheck, controller[4]);
router.get("/delete/:objectId", authCheck, controller[5]);
router.get("/login", controller[6]);
router.post("/authorize", controller[7]);
router.post("/homepage-update/:id", controller[8]);
router.post("/aboutpage-update/:id", controller[9]);
router.get("/logout", controller[10]);

module.exports = router;
