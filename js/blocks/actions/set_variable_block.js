class SetVariableBlock extends ActionBlock {
  constructor(position, content, type, var_name) {
    let name = "Set " + var_name + " = " + content + "";
    
    super(name, position);
    this.content = content;
    this.type = type;
    this.var_name = var_name;
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
}