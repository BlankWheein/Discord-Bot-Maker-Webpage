class CommandBlock extends EventBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;
    this.json_compiler = {
      command: {}
    }
    this.add_field("Name", "text", "name");
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Command: " + this.name);
  }

  compile_json(actions) {
    let json = {};
    json[this.name] = this.json_compiler["command"];
    json[this.name]["actions"] = actions;
    return json;
  }
}