class SetChannelBlock extends ActionBlock {
  constructor(x = 0, y = 0, id = 736592970601594921) {
    super([x, y]);

    this.id = id;

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set channel ID");
  }

  compile_json() {
    return {
      setChannel: {
        id: this.id
      }
    };
  }

  get_form_info() {
    return [
      {
        name: "Channel ID",
        value: this.id,
        type: "number",
        variable: "id"
      }
    ];
  }
}