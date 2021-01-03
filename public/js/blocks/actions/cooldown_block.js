class CooldownBlock extends ActionBlock {
  constructor(params) {
    super(getParam(params, "position", [0, 0]));
    this.params = params;

    this.json_compiler = {
      cooldown: {}
    }

    this.add_field("Cooldown", "text", "cooldown");
    this.add_field("BucketType", ["channel", "guild", "member"], "buckettype")
    this.add_field("Error", "text", "error");

    this.add_print();
    this.update_text();
  }

  update_text() {
    this.update_dom_text(this.buckettype + " cooldown for: " + this.cooldown + " seconds");
  }

}