class SetChannelBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.id = getParam(params, "id", "736648548380049541");

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set channel ID");
  }

  compile_json() {
    let obj = {
      setChannel: {
        id: this.id
      }
    };

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Channel ID",
        value: this.id,
        type: "text",
        variable: "id"
      }
    ];
  }

  get_custom_variables() {
    return [];
  }
}