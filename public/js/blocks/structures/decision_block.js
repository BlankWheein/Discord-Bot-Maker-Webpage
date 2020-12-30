class DecisionBlock extends StructureBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      ifStatement: {
      }
    }

    this.add_field("Variable 1", "text", "var1");
    this.add_field("Variable 2", "text", "var2");
    this.add_field("Operator", [
      "==",
      "<",
      "!=",
      ">",
      ">=",
      "<="
    ], "operator")

    

    this.add_print();

    this.update_text();
  }

  update_text() {
    this.update_dom_text(this.var1 + " " + this.operator + " " + this.var2);
  }

  compile_json(true_actions, false_actions) {
    var key = Object.keys(this.json_compiler)[0];
    this.json_compiler[key]["true"] = true_actions;
    this.json_compiler[key]["false"] = false_actions;
    return this.json_compiler;
  }

}