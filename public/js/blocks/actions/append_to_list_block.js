class AppendToListBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      append_to_list: {}
    }

    this.add_field("Value", "text", "value");
    this.add_field("Target", "text", "target", true);

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Append to List");
  }

}