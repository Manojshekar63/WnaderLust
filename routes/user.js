const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");  // Changed: removed 'd'

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", wrapasync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        
        req.login(registeredUser, (err) => {
            if(err) return next(err);
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.post("/login",
    saveRedirectUrl,  // Changed: removed 'd'
    passport.authenticate("local", 
        { failureRedirect: "/login", failureFlash: true }),
    async (req, res) => {
        req.flash("success", "Welcome back to wanderlust!");
        res.redirect(res.locals.redirectUrl || "/listings");  // Added fallback
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
});

module.exports = router;
