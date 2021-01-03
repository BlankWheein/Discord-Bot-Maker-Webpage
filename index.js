var express = require("express");
var bodyParser = require("body-parser");
const fs = require('fs');

var app = express();
app.locals.fs = fs;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

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

app.get("/create_command/:command", function (req, res) {
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

app.get("/commands/:command", function (req, res) {
  const command_name = req.params.command;

  fs.readFile("user.json", (err, data) => {
    if (err) throw err;
    let commands = JSON.parse(data);
    res.render("dashboard", {
      command_names: Object.keys(commands),
      current_command: command_name,
      page_type: "commands"
    });
  });
});

app.get("/commands/:command/canvas_instructions", function (req, res) {
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

app.post("/commands/:command/save_command", function (req, res) {
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

app.post("/commands/:command/delete_command", function (req, res) {
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