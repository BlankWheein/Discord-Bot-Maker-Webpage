class LoopBlock extends Block {
  constructor(name, position) {
    let color = "#27ae60";
    let dimension = [200, 100];

    let html = '<div class="action-content">\
                  <span class="action-title-text">' + name + '</span>\
                </div>';

    super(html, position, dimension, color);
  }
}