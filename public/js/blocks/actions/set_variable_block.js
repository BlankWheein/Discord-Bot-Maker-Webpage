class SetVariableBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.params = params;

    this.json_compiler = {
      setVariable: {}
    }

    this.add_field("Content", "text", "content");
    this.add_field("Type", ["int", "str"], "type")
    this.add_field("Var", "text", "var", true);
    this.add_print();

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set " + this.var + " = " + this.content);
  }
}