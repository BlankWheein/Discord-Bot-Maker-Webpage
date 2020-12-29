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

  add_print(params) {
    this.print = getParam(params, "print", "");
    this.form_info.push(
      {
      name: "print",
      value: this.print,
      type: "text",
      variable: "print",}
    )

    for(let key in this.json_compiler){
      this.json_compiler[key].print = this.print;
    }
  }
}