class RemoveRolesBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.reason = getParam(params, "reason", "Reason Not Specified");


    this.form_info = [
      {
        name: "Reason",
        value: this.reason,
        type: "text",
        variable: "reason"
      }
    ];
    
    this.json_compiler = {
      remove_roles: {
        reason: this.reason
      }
    }

    this.add_print();
    this.add_target();
    this.add_roles();
    console.log(this);
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Remove Roles");
  }

  compile_json() {
    return this.json_compiler;
  }

  get_form_info() {
    return this.form_info;
  }

  get_custom_variables() {
    return [];
  }
}