class Block{
  constructor(text, position){
    this.text = text;
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

  assign_dom(dom){
    this.dom = dom;
  }

  compile_json(){
    return {};
  }
}