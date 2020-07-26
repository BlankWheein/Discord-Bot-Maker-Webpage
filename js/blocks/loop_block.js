class LoopBlock extends Block {
  constructor(name, position) {
    let color = "#27ae60";
    let dimension = [200, 100];
    let anchors_position = {
      "in": [position[0] + 100, position[1] + 0],
      "out": [position[0] + 200, position[1] + 50],
      "loop": [position[0] + 100, position[1] + 100]
    }

    let html = '<div class="action-content">\
                  <span class="action-title-text">' + name + '</span>\
                </div>';

    super(html, position, dimension, anchors_position, color);
  }
}