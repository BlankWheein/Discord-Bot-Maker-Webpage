class TryCatchBlock extends StructureBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      try_catch: {
      }
    }

    this.add_field("Exception", ["Exception", "ArgumentError", "ValueError", "ChannelNotFound"], "exception");
    this.add_field("ErrorVar", "text", "errorvar");
    
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Try Catch");
  }

  compile_json(actions, error_actions) {
    var key = Object.keys(this.json_compiler)[0];
    this.json_compiler[key]["actions"] = actions;
    this.json_compiler[key]["error"] = error_actions;
    return this.json_compiler;
  }

}