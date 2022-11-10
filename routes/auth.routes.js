// To iniciate the router
const router = require("express").Router();
var session = require("express-session");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const app = require("../app");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");

// GET signup page

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("signup");
});

// POST signup page

router.post("/signup", isLoggedOut, async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const userEmail = await User.findOne({ email: req.body.email });

    if (userEmail === null) {
      await User.create({
        name: req.body.name,
        email: userEmail,
        password: hashPassword,
      });
      res.redirect("/auth/login");
    } else {
      res.render("signup", {
        errorMessage: "This e-mail is already registered.",
        isConnected: false,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.render("signup", {
      errorMessage: error.message,
      isConnected: false,
    });
  }
});

// GET login page

router.get("/login", isLoggedOut, (req, res) => {
  res.render("login", { isConnected: false });
});

// POST login page

router.post("/login", isLoggedOut, async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email });
  console.log({ email });
  if (!currentUser) {
    res.render("login", {
      errorMessage: "E-mail is not registered.",
      isConnected: false,
    });
  } else {
    if (bcrypt.compareSync(password, currentUser.password)) {
      req.session.user = currentUser;
      console.log("Yess");
      res.redirect("/profile");
    } else {
      res.render("login", {
        errorMessage: "Incorrect password.",
        isConnected: false,
      });
    }
  }
});

// GET Logout

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/auth/login");
  });
});

module.exports = router;
