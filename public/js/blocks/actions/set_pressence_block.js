class SetPressenceBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      setPressence: {}
    }

    this.add_field("Game", "text", "game");
    this.add_field("Status", ["dnd", "idle", "offline", "online", ""], "status");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("setPressence");
  }

}