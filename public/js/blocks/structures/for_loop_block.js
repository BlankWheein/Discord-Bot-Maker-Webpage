class ForLoopBlock extends StructureBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      forLoop: {
      }
    }

    this.add_field("Type", [
      "for x in",
      "stop",
      "start",
    ], "type");

    this.add_field("List", "text", "list");
    this.add_field("Stop", "text", "stop");
    this.add_field("Start", "text", "start");
    this.add_field("Var", "text", "var");
    

    this.update_text();
  }

  update_text() {
    this.update_dom_text("For Loop " + this.type);
  }

  compile_json(actions) {
    var key = Object.keys(this.json_compiler)[0];
    this.json_compiler[key]["actions"] = actions;
    return this.json_compiler;
  }

}