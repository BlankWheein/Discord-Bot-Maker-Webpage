class GetMemberBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      getMember: {}
    }

    this.add_field("TYPE", ["id", "name"], "type");
    this.add_field("Name", "text", "name");
    this.add_field("ID", "int", "id");
    this.add_field("Var", "text", "var");
    this.add_print();

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Get Member");
  }

}