class SequenceParser{
  constructor(object_drawer){
    this.object_drawer = object_drawer;
  }

  generate_event_order(){
    function create_json(current_block, current_json) {
      if (current_block instanceof DecisionBlock) {
        let true_json = [];
        let false_json = [];

        current_block.get_connections("true").forEach(e => {
          true_json = true_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("false").forEach(e => {
          false_json = false_json.concat(create_json(e.target_block, []));
        });

        let block = current_block.compile_json(true_json, false_json);
        return Object.assign({}, current_json, block);
      } else if (current_block instanceof EventBlock) {
        let branches_json = [];

        current_block.connections.forEach(e => {
          branches_json = branches_json.concat(create_json(e.target_block, []));
        });

        return Object.assign({}, current_json, current_block.compile_json(branches_json));
      } else {
        let branches_json = [];

        current_block.connections.forEach(e => {
          branches_json = branches_json.concat(create_json(e.target_block, []));
        });

        let merge = [current_block.compile_json()];
        merge = merge.concat(branches_json);
        return merge;
      }
    }

    let head = this.object_drawer.blocks_objs[EventBlock.name + "_0"];
    let json = create_json(head, {});
    console.log(json);
    $("#json-output").html(JSON.stringify(json));
    return json;
  }
}