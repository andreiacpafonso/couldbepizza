const router = require("express").Router();
var session = require("express-session");

/* GET home page */
router.get("/", (req, res, next) => {
  let isConnected = false;
  if (req.session.user) {
    isConnected = true;
  }

  res.render("index", { isConnected });
});

// GET profile page

module.exports = router;
