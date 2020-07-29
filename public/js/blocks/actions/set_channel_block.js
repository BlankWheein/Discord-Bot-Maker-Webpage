class SetChannelBlock extends ActionBlock {
  constructor(params) {
    super(isDefined(params["position"]) ? params["position"] : [0, 0]);

    this.id = isDefined(params["id"]) ? params["id"] : "736592970601594921";

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