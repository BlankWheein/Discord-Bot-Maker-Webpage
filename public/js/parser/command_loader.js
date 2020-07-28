class CommandLoader{
  constructor(object_drawer){
    this.object_drawer = object_drawer;;
  }

  draw_command(json){
    json["commands"].forEach(e => {
      let all_params = Object.assign({}, e.position, e.variables);
      let obj = new ALL_BLOCKS[e.command](...Object.values(all_params));
      this.object_drawer.draw_block(obj, e.id);
    });

    json["connections"].forEach(e => {
      let type = "basic";

      let from_class = e.from.split("_")[0];
      if (from_class == "DecisionBlock") {
        type = "decision";
      }

      this.object_drawer.connect_blocks(e.from, e.to, type, e.label);
    });
  }
}