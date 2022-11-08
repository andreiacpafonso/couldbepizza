const router = require("express").Router();

var session = require("express-session");
const User = require("../models/User.model");
const Userpizza = require("../models/Userpizza.model");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { isLoggedIn } = require("../middleware/route-guard");
const uploader = require("../middleware/cloudinary.config.js");

router.get("/profile", isLoggedIn, async (req, res) => {
  const currentUser = await User.findById(req.session.user._id).populate(
    "userPizza"
  );
  console.log(currentUser);
  res.render("profile", { currentUser, isConnected: true });
});
router.get("/register-pizza", isLoggedIn, (req, res) => {
  res.render("register-pizza", { user: req.session.user, isConnected: true });
});
router.post(
  "/register-pizza",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
    console.log("file is: ", req.file);
    const newPizza = await Userpizza.create({
      imageUrl: req.file.path,
      namePizza: req.body.namePizza,
      city: req.body.city,
      country: req.body.country,
      ingredients: req.body.ingredients,
      review: req.body.review,
    });
    const currentUser = await User.findByIdAndUpdate(req.session.user._id, {
      $push: { userPizza: newPizza._id },
    });

    if (!req.file) {
      console.log("there was an error uploading the file");
      next(new Error("No file uploaded!"));
      return;
    }
    res.redirect("/profile");
    // You will get the image url in 'req.file.path'
    // Your code to store your url in your database should be here
  }
);
module.exports = router;
