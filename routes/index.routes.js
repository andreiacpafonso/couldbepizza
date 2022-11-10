const router = require("express").Router();
var session = require("express-session");
const Userpizza = require("../models/Userpizza.model");

/* GET home page */
router.get("/", (req, res, next) => {
  let isConnected = false;
  if (req.session.user) {
    isConnected = true;
  }

  res.render("index", { currentUser: req.session.user, isConnected });
});

// GET See all pizzas page
router.get("/see-all-pizzas", async (req, res, next) => {
  const pizzas = await Userpizza.find();
  res.render("see-all-pizzas", { currentUser: req.session.user, pizzas });
});
router.post("/search/see-all-pizzas", async (req, res) => {
  const search = req.body.search.toLowerCase();
  console.log(search);
  const pizzas = await Userpizza.find({ ingredients: { $in: [search] } });
  console.log(pizzas);

  // athletes contains an ordered list of 5 athletes who play Tennis
  res.render("see-all-pizzas", { currentUser: req.session.user, pizzas });
});
module.exports = router;
