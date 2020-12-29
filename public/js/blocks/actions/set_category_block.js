class SetCategoryBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.id = getParam(params, "id", "736745547917951017");

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Set Category ID");
  }

  compile_json() {
    let obj = {
      set_category: {
        id: this.id
      }
    };

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Category ID",
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