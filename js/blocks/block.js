class Block{
  constructor(html, position, dimension, color){
    this.html = html;
    this.position = position;
    this.dimension = dimension;
    this.color = color;
    this.dom = undefined;
    this.connections = [];

    this.anchors_position = {
      "top_left": [position[0] + this.dimension[0] * 0.33, position[1]],
      "top_center": [position[0] + this.dimension[0] / 2, position[1]],
      "top_right": [position[0] + this.dimension[0] * 0.66, position[1]],
      "bottom_left": [position[0] + this.dimension[0] * 0.33, position[1] + this.dimension[1]],
      "bottom_center": [position[0] + this.dimension[0] / 2, position[1] + this.dimension[1]],
      "bottom_right": [position[0] + this.dimension[0] * 0.66, position[1] + this.dimension[1]],
      "left": [position[0], position[1] + this.dimension[1] / 2],
      "right": [position[0] + this.dimension[0], position[1] + this.dimension[1] / 2]
    }
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