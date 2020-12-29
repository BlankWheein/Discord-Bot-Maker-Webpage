class CreateListBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      create_list: {}
    }

    this.add_field("Var", "text", "var", true);

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Create Empty List");
  }

}