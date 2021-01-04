class SequenceParser{
  constructor(object_drawer){
    this.object_drawer = object_drawer;
  }

  generate_event_order(){
    console.log(this.object_drawer);
    function create_json(current_block, current_json) {
      if (current_block instanceof DecisionBlock) {
        let true_json = [];
        let false_json = [];
        let either_json = [];

        current_block.get_connections("true").forEach(e => {
          true_json = true_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("false").forEach(e => {
          false_json = false_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("either").forEach(e => {
          either_json = either_json.concat(create_json(e.target_block, []));
        });

        let block = current_block.compile_json(true_json, false_json);

        let merge = [...current_json];
        merge = merge.concat(block);
        merge = merge.concat(either_json);
        return merge;
      }
      if (current_block instanceof IfnDefBlock) {
        let true_json = [];
        let false_json = [];
        let either_json = [];

        current_block.get_connections("true").forEach(e => {
          true_json = true_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("false").forEach(e => {
          false_json = false_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("end").forEach(e => {
          either_json = either_json.concat(create_json(e.target_block, []));
        });

        let block = current_block.compile_json(true_json, false_json);

        let merge = [...current_json];
        merge = merge.concat(block);
        merge = merge.concat(either_json);
        return merge;
      }
      if (current_block instanceof TryCatchBlock) {
        let try_json = [];
        let catch_json = [];
        let end_json = [];

        current_block.get_connections("try").forEach(e => {
          try_json = try_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("catch").forEach(e => {
          catch_json = catch_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("end").forEach(e => {
          end_json = end_json.concat(create_json(e.target_block, []));
        });

        let block = current_block.compile_json(try_json, catch_json);

        let merge = [...current_json];
        merge = merge.concat(block);
        merge = merge.concat(end_json);
        return merge;
      }
      if (current_block instanceof ForLoopBlock) {
        let loop_json = [];
        let end_json = [];

        current_block.get_connections("loop").forEach(e => {
          loop_json = loop_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("end").forEach(e => {
          end_json = end_json.concat(create_json(e.target_block, []));
        });

        let block = current_block.compile_json(loop_json);

        let merge = [...current_json];
        merge = merge.concat(block);
        merge = merge.concat(end_json);
        return merge;
      } 
      else if (current_block instanceof WithTypingBlock) {
        let loop_json = [];
        let end_json = [];

        current_block.get_connections("withtyping").forEach(e => {
          loop_json = loop_json.concat(create_json(e.target_block, []));
        });

        current_block.get_connections("end").forEach(e => {
          end_json = end_json.concat(create_json(e.target_block, []));
        });

        let block = current_block.compile_json(loop_json);

        let merge = [...current_json];
        merge = merge.concat(block);
        merge = merge.concat(end_json);
        return merge;
      }
      else if (current_block instanceof EventBlock) {
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

    try{
      let head = undefined;

      Object.keys(this.object_drawer.blocks_objs).forEach(e => {
        let v = this.object_drawer.blocks_objs[e];
        if (v instanceof EventBlock) {
          head = v;
          return;
        }
      });
      
      if (head){
        let json = create_json(head, {});
        return json;
      }else{
        return { error: "no-event-block" };
      }
    } catch (e){
      console.log(e);
      return { error: "infinite-loop" };
    }
  }
}