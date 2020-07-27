class Block{
  constructor(position = [0, 0]){
    this.text = "";
    this.position = position;
    this.dom = undefined;
    this.connections = [];
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

  get_form_info() {
    return [];
  }

  assign_dom(dom){
    this.dom = dom;
    this.update_text();
  }

  compile_json(){
    return {};
  }

  update_dom_text(new_text){
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
    });

    this.update_text();
  }
}