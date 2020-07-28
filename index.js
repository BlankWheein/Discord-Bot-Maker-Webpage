var express = require("express");
var bodyParser = require("body-parser");
const fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("command-list");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});