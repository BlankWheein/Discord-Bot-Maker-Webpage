var express = require("express");
var bodyParser = require("body-parser");
const fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    let commands = JSON.parse(data);
    res.render("dashboard", {
      command_names: Object.keys(commands)
    });
  });
});

app.get("/commands/:command", function (req, res) {
  const command_name = req.params.command;

  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    let commands = JSON.parse(data);
    res.render("dashboard", {
      command_names: Object.keys(commands),
      current_command: command_name
    });
  });
});

app.get("/commands/:command/canvas_instructions", function (req, res) {
  const command_name = req.params.command;

  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    let commands = JSON.parse(data);
    res.json(commands[command_name]);
  });
});


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});