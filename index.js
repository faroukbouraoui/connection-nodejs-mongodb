const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const mongoose = require("mongoose");
const User = require("./models/Users");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("views"));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
  app.get("/login", (req, res) => {
    res.render("login");
  });

  ///////// post
  app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
      email: email,
      password: password,
    });
    newUser.save((err) => {
      err ? console.log(err) : res.send("successfully created User");
    });
  });
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, foundResult) => {
    if (err) {
      console.log(err);
    } else {
      if (foundResult.password === password) {
        res.render("form");
      } else {
        res.send("incorrect email or password");
      }
    }
  });
});

var questionList = [
  {
    question: "wher are you from",
    reponse: "nabeul",
  },
  {
    question: "how old are you",
    reponse: "24",
  },
];
app.get("/", (req, res) => {
  req.render("form", {
    title: " question form",
    question_List: questionList,
  });
});
app.listen(PORT, () => console.log("server started"));
