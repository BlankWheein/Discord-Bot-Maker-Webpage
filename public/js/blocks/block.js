class Block {
  constructor(position = [0, 0]) {
    this.text = "";
    this.position = position;
    this.dom = undefined;
    this.connections = [];
    this.form_info = [];
    this.custom_vars = [];
    
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
        var key = Object.keys(this.json_compiler)[0];
        this.json_compiler[key][e] = v;
        }
    });

    
    this.update_text();
  }

  // Overwritable functions
  get_form_info() {
    return this.form_info;
  }

  compile_json() {
    return this.json_compiler;
  }

  update_text() {
    this.update_dom_text("Block");
  }

  get_custom_variables() {
    return this.custom_vars;
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

  //Generic field
  add_field(name, type, var_, is_variable = false) {
    this[var_] = getParam(this.params, var_, name);

    this.form_info.push(
      {
        name: name,
        value: this[var_],
        type: type,
        variable: var_
      }
    )
      
    for(let key in this.json_compiler){
      this.json_compiler[key][var_] = this[var_];
    }
    if(is_variable) {
      this.custom_vars.push(var_);
    }
  }


}