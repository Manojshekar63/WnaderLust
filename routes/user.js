const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");  // Changed: removed 'd'
const usercontroller = require("../controllers/users.js");


router.get("/signup", usercontroller.rendersignupform);

router.post("/signup", wrapasync(usercontroller.signup));

router.get("/login", usercontroller.renderloginform);

router.post("/login",
    saveRedirectUrl,  
    passport.authenticate("local", 
        { failureRedirect: "/login",
             failureFlash: true }),
             usercontroller.login
    
);

router.get("/logout", usercontroller.logout 
);

module.exports = router;
