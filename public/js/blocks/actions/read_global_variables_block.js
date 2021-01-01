class ReadGlobalVariablesBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      read_global_variables: {}
    }

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Read Global Variables");
  }

}