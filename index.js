var express = require("express");
var bodyParser = require("body-parser");
const fs = require('fs');
const { resolve, relative } = require('path');

var app = express();
app.locals.fs = fs;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

function get_all_blocks_paths(dir="public/js/blocks"){
  let all_paths = [];
  let open_dirs = [dir];

  while(open_dirs.length > 0){
    let curr_dir = open_dirs.shift();
    let p = fs.readdirSync(curr_dir, { withFileTypes: true });
    p.forEach(e => {
      if(e.isDirectory()){
        open_dirs.push(curr_dir + "/" + e.name);
      }else if(curr_dir != dir){
        all_paths.push(curr_dir + "/" + e.name);
      }
    });
  }

  return all_paths.map(path => {
    return path.replace("public", ".."); 
  });
}

let all_blocks_files = get_all_blocks_paths();
let block_tabs = JSON.parse(fs.readFileSync("blocks.json"));

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
      all_blocks_files: all_blocks_files,
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