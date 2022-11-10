const router = require("express").Router();

var session = require("express-session");
const User = require("../models/User.model");
const Userpizza = require("../models/Userpizza.model");
const app = require("../app");
const bcrypt = require("bcryptjs");
const {
  isLoggedIn,
  isLoggedInAndLikePizza,
} = require("../middleware/route-guard");
const uploader = require("../middleware/cloudinary.config.js");
const { findByIdAndDelete } = require("../models/User.model");

router.get("/profile", isLoggedIn, async (req, res) => {
  const currentUser = await User.findById(req.session.user._id).populate(
    "userPizza"
  );
  console.log("currentUser", currentUser);
  res.render("profile", { currentUser, isConnected: true });
});
router.get("/register-pizza", isLoggedIn, (req, res) => {
  res.render("register-pizza", {
    currentUser: req.session.user,
    isConnected: true,
  });
});
router.post(
  "/register-pizza",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    let pizzaImg;

    if (req.file == undefined) {
      pizzaImg =
        "https://img.freepik.com/free-photo/pizza-with-salami-tomatoes-olives-cheese-dough-with-whole-wheat-flour-italian-food_2829-6855.jpg?w=1380&t=st=1667915693~exp=1667916293~hmac=bf0f0ed1b04c6aa61987760ee4c701f5940a2cb342e3582cc2bcdc1f8f8be842";
    } else {
      pizzaImg = req.file.path;
    }
    const ingredients = req.body.ingredients
    const lowerIngredients = ingredients.map((ingredient) => {
      return ingredient.toLowerCase()
    })
 
    const newPizza = await Userpizza.create({
      imageUrl: pizzaImg,
      namePizza: req.body.namePizza,
      city: req.body.city,
      country: req.body.country,
      ingredients: lowerIngredients,
      review: req.body.review,
      pizzaholic:[]
    });
    const currentUser = await User.findByIdAndUpdate(req.session.user._id, {
      $push: { userPizza: newPizza._id },
    });

    res.redirect("/profile");
    // You will get the image url in 'req.file.path'
    // Your code to store your url in your database should be here
  }
);

router.get("/update/:id", async (req, res) => {
  const updatePizza = await Userpizza.findById(req.params.id);
  const currentUser = await User.findById(req.session.user._id);
  console.log("updatePizza", updatePizza);
  res.render("update", { updatePizza, currentUser });
});

//  router.post("/update/:Id"

router.post("/update/:id", uploader.single("imageUrl"), async (req, res) => {
  console.log(req.body, req.file);
  await Userpizza.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/profile");
});

router.get("/delete/:id", async (req, res) => {
  await Userpizza.findByIdAndDelete(req.params.id);

  res.redirect("/profile");
});

router.get("/likes/:id", isLoggedInAndLikePizza, async (req, res) => {
  const likePizza = await Userpizza.findByIdAndUpdate(req.params.id, {
    $push: { pizzaholic: req.session.user._id },
  });
  const currentUser = await User.findByIdAndUpdate(req.session.user._id, {
    $push: { likedpizzas: likePizza._id },
  });

  res.redirect("/see-all-pizzas");
});

module.exports = router;
