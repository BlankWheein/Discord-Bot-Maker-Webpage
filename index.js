var express = require("express");
var bodyParser = require("body-parser");
const fs = require('fs');

var app = express();
app.locals.fs = fs;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let block_tabs = [
  {
    name: "Tab 0 Name",
    blocks: [
      { name: "On Ready", id: "add-on-ready" },
      { name: "Cooldown", id: "add-cooldown" }
    ]
  },
  {
    name: "Tab 1 Name",
    blocks: [
      { name: "Set Var", id: "add-set-var" },
      { name: "Set Channel", id: "add-set-channel" }
    ]
  }
]

app.get("/", function (req, res) {
  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    let commands = JSON.parse(data);
    res.render("dashboard", {
      command_names: Object.keys(commands),
      page_type: "home"
    });
  });
});

app.get("/commands/get-all-instructions", function (req, res) {
  try{
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      let commands = JSON.parse(data);
      res.json({
        result: "success",
        response: commands
      });
    });
  }catch(e){
    res.json({
      result: "error",
      response: e
    });
  }
});

app.get("/commands/:command", function (req, res) {
  const command_name = req.params.command;

  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    let commands = JSON.parse(data);
    res.render("dashboard", {
      block_tabs: block_tabs,
      command_names: Object.keys(commands),
      current_command: command_name,
      page_type: "commands"
    });
  });
});

app.get("/commands/:command/canvas-instructions", function (req, res) {
  const command_name = req.params.command;

  try{
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      let commands = JSON.parse(data);
      res.json({
        result: "success",
        response: commands[command_name]
      });
    });
  }catch(e){
    res.json({
      result: "error",
      response: e
    });
  }
});

app.get("/commands/:command/create", function (req, res) {
  const command_name = req.params.command;

  try{
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      let commands = JSON.parse(data);

      if(!(command_name in commands)){
        commands[command_name] = {
          "commands": [],
          "connections": []
        };

        fs.writeFileSync('user.json', JSON.stringify(commands, null, 2));
      }

      res.redirect(`/commands/${command_name}`);
    });
  }catch(e){
    res.json({
      result: "error",
      response: e
    });

    res.redirect("/");
  }
});

app.post("/commands/:command/save", function (req, res) {
  const command_name = req.params.command;
  const command_json = JSON.parse(req.body.command_json);

  try{
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      let commands = JSON.parse(data);
      commands[command_name] = command_json;

      fs.writeFileSync('user.json', JSON.stringify(commands, null, 2));
      res.json({
        result: "success",
        response: ""
      });
    });
  }catch(e){
    res.json({
      result: "error",
      response: e
    });
  }
});

app.post("/commands/:command/delete", function (req, res) {
  const command_name = req.params.command;

  try{
    fs.readFile("user.json", (err, data) => {
      if (err) throw err;
      let commands = JSON.parse(data);

      if(command_name in commands){
        delete commands[command_name];
        fs.writeFileSync('user.json', JSON.stringify(commands, null, 2));
      }
    });
  }catch(e){
    res.json({
      result: "error",
      response: e
    });
  }

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});