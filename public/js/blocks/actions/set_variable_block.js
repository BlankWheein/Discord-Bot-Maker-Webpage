class SetVariableBlock extends ActionBlock {
  constructor(x = 0, y = 0, content = "TuckFaaha", type = "str", var_name = "var1") {
    super([x, y]);

    this.content = content;
    this.type = type;
    this.var_name = var_name;

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set " + this.var_name + " = " + this.content);
  }

  compile_json() {
    return {
      setVariable: {
        content: this.content,
        type: this.type,
        var: this.var_name
      }
    };
  }

  get_form_info() {
    return [
      {
        name: "Variable Name",
        value: this.var_name,
        type: "text",
        variable: "var_name"
      },
      {
        name: "Variable Type",
        value: this.type,
        type: [
          "int",
          "str"
        ],
        variable: "type"
      },
      {
        name: "Variable Value",
        value: this.content,
        type: "text",
        variable: "content"
      }
    ];
  }
}