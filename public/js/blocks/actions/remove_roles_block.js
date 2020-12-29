class RemoveRolesBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      remove_roles: {}
    }
 
    this.add_field("Member ID", "text", "target");
    this.add_field("Role ID", "text", "roles");
    this.add_field("Reason", "text", "reason");
    this.add_print();

    this.update_text();
  }

  update_text() {
    this.update_dom_text("Remove Roles");
  }

  
}