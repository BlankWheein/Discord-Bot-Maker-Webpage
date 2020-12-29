class RemoveRolesBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));

    this.target = getParam(params, "target", "181125548389433344");
    this.roles = getParam(params, "roles", "793507089577803797");
    this.reason = getParam(params, "reason", "Reason Not Specified");


    this.form_info = [
      {
        name: "Member Id",
        value: this.target,
        type: "text",
        variable: "target"
      },
      {
        name: "Role ID",
        value: this.roles,
        type: "text",
        variable: "roles"
      },
      {
        name: "Reason",
        value: this.reason,
        type: "text",
        variable: "reason"
      }
    ];
    
    this.json_compiler = {
      remove_roles: {
        target: this.target,
        roles: this.roles,
        reason: this.reason,
      }
    }

    this.add_print(params);
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