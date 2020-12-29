class WaitBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      wait: {}
    }

    this.add_field("Wait", "int", "delay");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Wait " + this.delay);
  }

}