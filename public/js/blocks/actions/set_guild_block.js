class SetGuildBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.id = getParam(params, "id", "736249300807450665");

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set Guild ID");
  }

  compile_json() {
    let obj = {
      setGuild: {
        id: this.id
      }
    };

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Guild ID",
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