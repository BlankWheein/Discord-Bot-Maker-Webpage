class ReadMemberFileBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      read_member_file: {}
    }

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Read Member File");
  }

}