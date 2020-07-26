class DecisionBlock extends StructureBlock {
  constructor(position, var1, var2, operator) {
    let name = var1 + " " + operator + " " + var2;
    
    super(name, position);
    this.var1 = var1;
    this.var2 = var2;
    this.operator = operator;
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
}