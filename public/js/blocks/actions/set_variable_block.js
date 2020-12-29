class SetVariableBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.content = getParam(params, "content", "TuckFaaha");
    this.type = getParam(params, "type", "str");
    this.var_name = getParam(params, "var_name", "var1");

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

  get_custom_variables() {
    return [
      this.var_name
    ];
  }
}