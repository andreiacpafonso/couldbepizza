const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  /*  let isConnected = false;
 if (req.session.user) {
  isConnected = true;
 } */
  //res.send("Hello");
  res.render("index" /* , { isConnected } */);
});

// GET profile page

router.get("/profile", (req, res) => {
  console.log("SESSION =====> ", req.session);
  if (req.session.user) {
    res.render("profile", { user: req.session.user, isConnected: true });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
