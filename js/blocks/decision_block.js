class DecisionBlock extends Block {
  constructor(var1, var2, operator, position) {
    let color = "#923ed6";
    let dimension = [200, 100];

    let html = '<div class="action-content">\
                  <span class="action-title-text">' + var1 + " " + operator + " " +  var2 + '</span>\
                </div>';

    super(html, position, dimension, color);
  }
}