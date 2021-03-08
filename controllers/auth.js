const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require("express")
const router = express.Router()

module.exports = (app) => {
   // TODO: Implement authentication controller.
   // CRUD


   app.get("/", (req, res) => {
      var currentUser = req.user;
      // const access_token = 108832697926465
      // console.log(`https://superheroapi.com/api.php/${access_token}/`)
      return res.render("landpage", {currentUser});
   });

   app.get("/superhero", (req, res) => {
      return res.render("superhero");
   });

   app.get("/favourites", (req, res) => {
      return res.render("favourites");
   });

   app.get("/quiz", (req, res) => {
      return res.render("quiz");
   });

   app.get("/results", (req, res) => {
      return res.render("results");
   });

   // LOGIN FORM
   app.get("/login", (req, res) => {
      return res.render("login");
   });

   // SIGN UP FORM
   app.get("/sign-up", (req, res) => {
      var currentUser = req.user;
      return res.render("sign-up", { currentUser });
   });

   // LOGOUT
   app.get("/logout", (req, res) => {
      res.clearCookie("nToken");
      return res.redirect("/");
   });

   // LOGIN
   app.post("/login", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
      // Find this user name
      User.findOne({ username }, "username password")
        .then(user => {
          if (!user) {
            // User not found
            return res.status(401).send({ message: "Wrong Username or Password" });
          }
          // Check the password
          user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
              // Password does not match
              return res.status(401).send({ message: "Wrong Username or password" });
            }
            // Create a token
            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
              expiresIn: "60 days"
            });
            // Set a cookie and redirect to root
            res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
            res.redirect("/");
          });
        })
        .catch(err => {
          console.log(err);
        });
   });
   // SIGN UP POST
   app.post("/sign-up", (req, res) => {
      // Create User and JWT
      const user = new User(req.body);
      user
      .save()
      .then(user => {
          var token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
          res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
          res.redirect("/");
        })
        .catch(err => {
          console.log(err.message);
          return res.status(400).send({ err: err });
        });
   });

   app.put("/", (req, res) => {
      return res.send("Received a PUT HTTP method");
   });
   
   app.delete("/", (req, res) => {
      return res.send("Received a DELETE HTTP method");
   });
   
   app.all("*", (req, res) => {
      return res.redirect("/")
   });
}
