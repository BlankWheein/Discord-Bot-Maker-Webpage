class SetChannelBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.params = params;

    this.json_compiler = {
      setChannel: {}
    }

    this.add_field("ID", "int", "id");
    this.add_print();

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set channel ID");
  }

}