class Block{
  constructor(html, position, dimension, anchors_position, color){
    this.html = html;
    this.position = position;
    this.dimension = dimension;
    this.anchors_position = anchors_position;
    this.color = color;
    this.dom = undefined;
    this.connections = [];
  }

  assign_dom(dom){
    this.dom = dom;
  }

  assign_incoming_connection(from_block, connection_dom, anchor){
    this.connections.push({
      from_block: from_block,
      connection_dom: connection_dom,
      anchor: anchor,
      type: "incoming"
    });
  }

  assign_outgoing_connection(to_block, connection_dom, anchor) {
    this.connections.push({
      to_block: to_block,
      connection_dom: connection_dom,
      anchor: anchor,
      type: "outgoing"
    });
  }
}