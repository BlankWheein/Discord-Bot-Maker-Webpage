class Block {
  constructor(position = [0, 0]) {
    this.text = "";
    this.position = position;
    this.dom = undefined;
    this.connections = [];
    
  }

  // General block functions
  assign_dom(dom) {
    this.dom = dom;
    this.update_text();
  }

  get_connections(conn_type) {
    let out_connections = [];

    this.connections.forEach(e => {
      if (e.connection_type == conn_type) {
        out_connections.push(e);
      }
    });

    return out_connections;
  }

  update_dom_text(new_text) {
    this.text = new_text;

    $(this.dom).find('span').remove();
    $(this.dom).prepend($("<span/>", {
      html: this.text
    }));
  }

  update_text() {
    this.update_dom_text("Block");
  }

  update_parameters(new_params) {
    Object.keys(new_params).forEach(e => {
      let v = new_params[e];
      this[e] = v;

      if("json_compiler" in this){
        this.json_compiler[e] = v;
      }
    });

    this.update_text();
  }

  // Overritable functions
  get_form_info() {
    return [];
  }

  compile_json() {
    return {};
  }

  update_text() {
    this.update_dom_text("Block");
  }

  get_custom_variables() {
    return [];
  }


  //Print stuff
  add_print() {
    this.print = getParam(this.params, "print", "");
    this.form_info.push(
      {
      name: "Print",
      value: this.print,
      type: "text",
      variable: "print"}
    )

    for(let key in this.json_compiler){
      this.json_compiler[key].print = this.print;
    }
  }

  // Member Target
  add_target() {
    this.target = getParam(this.params, "target", "181125548389433344");
    this.form_info.push(
      {
        name: "Member Id",
        value: this.target,
        type: "text",
        variable: "target"
      }
    )

    for(let key in this.json_compiler){
      this.json_compiler[key].target = this.target;
    }
  }


   // Role Target
   add_roles() {
    this.roles = getParam(this.params, "roles", "793507089577803797");
   
      this.form_info.push(
        {
          name: "Role ID",
          value: this.roles,
          type: "text",
          variable: "roles"
        }
      )
    
    
    
    

    for(let key in this.json_compiler){
      this.json_compiler[key].roles = this.roles;
    }
  }


}