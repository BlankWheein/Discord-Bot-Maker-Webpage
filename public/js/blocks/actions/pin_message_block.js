class PinMessageBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      pin_message: {}
    }

    this.add_field("Message", "int", "message");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Pin Message");
  }

}