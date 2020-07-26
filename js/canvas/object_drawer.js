class ObjectDrawer extends Canvas{
  constructor(dom_id){
    super(dom_id);

    this.connection_thickness = 3;
    this.connection_color = "#000";
  }

  draw_block(block){
    let dom = this.create_block(block.position, block.dimension, block.html, block.color);
    block.assign_dom(dom);
  }

  draw_connection(a, b, anchor_a, anchor_b){
    let pos_a = a.anchors_position[anchor_a];
    let pos_b = b.anchors_position[anchor_b];

    let line_dom = this.create_line(pos_a, pos_b, this.connection_thickness, this.connection_color);

    a.assign_outgoing_connection(b, line_dom, anchor_a);
    b.assign_incoming_connection(a, line_dom, anchor_b);
  }
}