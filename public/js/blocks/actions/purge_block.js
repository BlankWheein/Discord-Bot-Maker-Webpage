class PurgeBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      purge: {}
    }

    this.add_field("Limit", "int", "limit");
    this.add_field("Var", "text", "var", true);

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Purge Channel");
  }

}