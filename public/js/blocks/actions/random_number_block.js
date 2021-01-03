class RandomNumberBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      random: {}
    }

    this.add_field("MIN", "int", "min");
    this.add_field("MAX", "int", "max");
    this.add_field("TYPE", ["int", "float"], "type");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text("Random number: (" + this.min + ", " + this.max + ")");
  }

}