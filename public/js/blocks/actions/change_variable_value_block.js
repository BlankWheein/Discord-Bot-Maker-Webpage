class ChangeVariableValueBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      change_variable_value: {}
    }

    this.add_field("Target", "text", "target");
    this.add_field("Operator", [
      "increment by 1",
      "decrement by 1",
      "add",
      "subtract",
      "times",
      "divide",
      "set"
    ], "operator");
    this.add_field("Value", "text", "value");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Change variable '" + this.target + "'");
  }

}