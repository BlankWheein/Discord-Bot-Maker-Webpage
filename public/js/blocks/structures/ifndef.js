class IfnDefBlock extends StructureBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      ifndef: {
      }
    }

    this.add_field("Key", "text", "key");
    
    this.update_text();
  }

  update_text() {
    this.update_dom_text("If '" + this.key +"' is Not defined");
  }

  compile_json(actions, error_actions) {
    var key = Object.keys(this.json_compiler)[0];
    this.json_compiler[key]["true"] = actions;
    this.json_compiler[key]["false"] = error_actions;
    return this.json_compiler;
  }

}