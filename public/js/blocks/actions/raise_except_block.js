class RaiseExceptBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      raise_exception: {}
    }

    this.add_field("Exception to raise",
    ["Exception", "ValueError", "ArgumentError"],"exception");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Raise \"" + this.exception + "\"");
  }

}