class WriteGlobalVariableBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      write_global_variable: {}
    }

    this.add_field("Key", "text", "key");
    this.add_field("Value", "text", "value");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Write Global Variables " + this.key + " " + this.value);
  }

}