class WithTypingBlock extends StructureBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      withTyping: {
      }
    }
    
    this.update_text();
  }

  update_text() {
    this.update_dom_text("With Typing");
  }

  compile_json(actions) {
    var key = Object.keys(this.json_compiler)[0];
    this.json_compiler[key]["actions"] = actions;
    return this.json_compiler;
  }

}