class PopFromListBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      pop_from_list: {}
    }

    this.add_field("Var", "text", "var", true);
    this.add_field("Target", "text", "target", true);
    this.add_field("Index", "int", "index");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Pop From List");
  }

}