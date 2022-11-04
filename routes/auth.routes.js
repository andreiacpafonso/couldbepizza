// To iniciate the router
const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const app = require("../app");

// GET signup page

/* router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
}); */

// POST signup page

/* router.post("/signup", async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        await User.create ({
            email : req.body.email,
            password : hashPassword
        });
        res.redirect("/auth/login");
    } catch (error) {
        console.log(error.message)
        res.render("auth/signup", { errorMessage: error.message, isConnected: false });
    }
}); */

// GET login page

/* router.get("/login", (req, res) => {
    res.render("auth/login", { isConnected: false });
}); */

// POST login page

/* router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if (currentUser) {
        res.render("auth/login", { errorMessage: "Email is not registered", isConnected: false });
    } else {
        if (bcrypt.compareSync(password, currentUser.password)) {
            req.session.currentUser = currentUser;
            res.redirect("/profile");
        } else {
            res.render("auth/login", { errorMessage: "Incorrect password", isConnected: false });
        }
    }
}); */

// GET Logout

/* router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        }
        res.redirect('/auth/login');
    });
}); */

module.exports = router;
