class PrintBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      print: {}
    }

    this.add_field("Message", "text", "message");
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Print");
  }

}