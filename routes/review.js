const express = require("express");
const router=express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapsync.js");
const {validateReview, isLoggedIn , isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");


//review routes
//post route
router.post("/", isLoggedIn,
   validateReview,
    wrapAsync( reviewcontroller.createReview ));


//delete review post route
router.delete("/:reviewId",
   isLoggedIn,
   isReviewAuthor,
    wrapAsync( reviewcontroller.destroyReview ));
 
module.exports=router;