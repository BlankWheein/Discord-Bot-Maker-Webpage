class GetArgumentBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      getArgument: {}
    }

    this.add_field("Index", "int", "index");

    this.add_field("Type", ["int", "str", "discord.Member", "discord.Role", "discord.Channel"], "type")
    this.add_field("Var", "text", "var", true);

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("GetArgument");
  }

}