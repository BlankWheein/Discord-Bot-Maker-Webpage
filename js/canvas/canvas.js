class Canvas{
  constructor(dom_id){
    this.dom_id = dom_id;
    this.dom = $("#" + this.dom_id);
  }

  create_block(position, dimension, html, color){
    let style = "left: " + position[0] + "px;" +
                "top: " + position[1] + "px;" +
                "width: " + dimension[0] + "px;" +
                "height: " + dimension[1] + "px;" +
                "background-color: " + color;

    let block = $("<div/>", {
      html: html,
      class: "action-block",
      style: style
    });

    this.dom.append(block);
    return block;
  }

  create_line(from_pos, to_pos, thickness, color){
    let x1 = from_pos[0];
    let x2 = to_pos[0];
    let y1 = from_pos[1];
    let y2 = to_pos[1];

    let dx = Math.abs(x1 - x2);
    let dy = Math.abs(y1 - y2);
    let length = Math.sqrt(dx * dx + dy * dy) * 1.1;
    
    let cx = ((x1 + x2) / 2) - (length / 2);
    let cy = ((y1 + y2) / 2) - (thickness / 2);
    let angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);

    let html_line = $("<div/>", {
      class: "connection-line",
      style: "height:" + thickness + "px; \
              background-color:" + color + "; \
              left:" + cx + "px; \
              top:" + cy + "px; \
              width:" + length + "px; \
              -moz-transform:rotate(" + angle + "deg); \
              -webkit-transform:rotate(" + angle + "deg); \
              -o-transform:rotate(" + angle + "deg); \
              -ms-transform:rotate(" + angle + "deg); \
              transform:rotate(" + angle + "deg); \
              z-index: -1;" 
    });

    this.dom.append(html_line);
    return html_line;
  }
}