class DecisionBlock extends StructureBlock {
  constructor(position, var1="var1", var2="var2", operator="==") {
    super(position);

    this.var1 = var1;
    this.var2 = var2;
    this.operator = operator;

    this.update_text();
  }

  update_text() {
    this.update_dom_text(this.var1 + " " + this.operator + " " + this.var2);
  }

  compile_json(true_actions, false_actions) {
    return {
      ifStatement: {
        var1: this.var1,
        var2: this.var2,
        operator: this.operator,
        true: true_actions,
        false: false_actions
      }
    };
  }

  get_form_info() {
    return [
      {
        name: "Variable 1",
        value: this.var1,
        type: "text",
        variable: "var1"
      },
      {
        name: "Operator",
        value: this.operator,
        type: "text",
        variable: "operator"
      },
      {
        name: "Variable 2",
        value: this.var2,
        type: "text",
        variable: "var2"
      }
    ];
  }
}