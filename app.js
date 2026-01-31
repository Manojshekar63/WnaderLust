const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expreererror.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const user = require("./models/user.js");
const listingrouter = require("./routes/listing.js");
const reviewrouter = require("./routes/review.js");
const userrouter = require("./routes/user.js");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//added
 const sessionoptions = {
   secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
 };
 app.use(session(sessionoptions));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Add this middleware to make currUser available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;  // Add this line
  next();
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// app.get("/demouser" ,async (req,res)=>{
//   let fakeuser =new user({email:"delta" ,username:"johnDoe",});
//   let newuser= await user.register(fakeuser ,"chicken");
//   res.send(newuser);
// }
// );
    


app.use("/listings", listingrouter);
app.use("/listings/:id/reviews", reviewrouter);
app.use("/", userrouter);

app.use( (req, res, next) => {
  next ( new ExpressError("Page Not Found" , 404));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).render("error.ejs", { err: { status: statusCode, message } });
});


app.listen(8080, () => {
  console.log("server is listening to port 8080");
});