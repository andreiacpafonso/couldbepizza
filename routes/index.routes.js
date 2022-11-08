const router = require("express").Router();
var session = require("express-session");
const Userpizza = require("../models/Userpizza.model");

/* GET home page */
router.get("/", (req, res, next) => {
  let isConnected = false;
  if (req.session.user) {
    isConnected = true;
  }

  res.render("index", { isConnected });
});

// GET See all pizzas page
router.get("/see-all-pizzas", async (req, res, next) => {
  const pizzas = await Userpizza.find();
  res.render("see-all-pizzas", { currentUser: req.session.user, pizzas });
});

module.exports = router;
