const router = require("express").Router();

var session = require("express-session");
const User = require("../models/User.model");
const app = require("../app");
const bcrypt = require("bcryptjs");

/*
router.get("/profile", (req, res) => {
  console.log("SESSION =====> ", req.session);
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
}); */

router.get("/profile", (req, res) => {
  //res.send("Hello");
  console.log("SESSION =====>", req.session);
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
