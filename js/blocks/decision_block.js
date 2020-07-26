class DecisionBlock extends Block {
  constructor(var1, var2, operator, position) {
    let color = "#923ed6";
    let dimension = [200, 100];
    let anchors_position = {
      "in": [position[0] + 100, position[1] + 0],
      "true": [position[0] + 75, position[1] + 100],
      "false": [position[0] + 125, position[1] + 100]
    }

    let html = '<div class="action-content">\
                  <span class="action-title-text">' + var1 + " " + operator + " " +  var2 + '</span>\
                </div>';

    super(html, position, dimension, anchors_position, color);
  }
}