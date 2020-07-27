class SetChannelBlock extends ActionBlock {
  constructor(position, id = 736592970601594921) {
    super(position);

    this.id = id;

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set channel = " + this.id);
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
        name: "Channel id",
        value: this.id,
        type: "number",
        variable: "id"
      }
    ];
  }
}