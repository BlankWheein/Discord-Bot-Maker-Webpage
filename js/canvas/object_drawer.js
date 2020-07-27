class ObjectDrawer extends Canvas{
  constructor(canvas_id){
    super(canvas_id);
    this.block_type_counter = {};
    this.blocks_objs = {};
    this.selected_block = undefined;

    let ctx = this;

    this.instance.bind("connection", function (info) {
      ctx.blocks_objs[info.sourceId].connections.push({
        target_block: ctx.blocks_objs[info.targetId],
        connection_type: info.connection.connector.canvas.nextElementSibling.innerText
      });

      // If the connection is of "decision" type
      if (info.connection.connector.typeId == "decision"){
        info.connection.bind("click", function (conn, originalEvent) {
          let new_label = conn.label == "true" ? "false" : "true";
          info.connection.removeOverlay("conn_label");
          info.connection.addOverlay(["Label", { label: new_label, location: 0.5, id: "conn_label" }]);

          for (let i = 0; i < ctx.blocks_objs[info.sourceId].connections.length; i++){
            if (ctx.blocks_objs[info.sourceId].connections[i].target_block.dom.id == info.connection.targetId){
              ctx.blocks_objs[info.sourceId].connections[i].connection_type = new_label;
            }
          }
        });
      }
    });
    
    this.instance.bind("click", function (c) {
      // If a connection was clicked while Shift was held
      if (pressed_keys[SHIFT_KEY_CODE]) {
        // Removing connection between two nodes
        ctx.instance.deleteConnection(c);
        ctx.blocks_objs[c.sourceId].connections = ctx.blocks_objs[c.sourceId].connections.filter(
          e => $(e.target_block.dom).attr("id") != c.targetId
        );
      }
    });
  }

  draw_block(block){
    let block_type = block.constructor.name;
    if(block instanceof EventBlock){
      block_type = EventBlock.name;
    }

    if (block_type in this.block_type_counter){
      var id = block_type + "_" + this.block_type_counter[block_type];
      this.block_type_counter[block_type]++;
    }else{
      var id = block_type + "_0";
      this.block_type_counter[block_type] = 1;
    }

    this.blocks_objs[id] = block;

    let dom = this.create_block(id, block.position);
    block.assign_dom(dom);

    let ctx = this;
    $(dom).click(() => {
      // If the node was clicked while the Shift key was held
      if (pressed_keys[SHIFT_KEY_CODE]) {
        ctx.instance.remove(dom);
      }else{
        this.selected_block = block;
        this.update_side_panel();
      }
    });

    return dom;
  }

  update_side_panel(){
    $("#edit-panel").empty();
    this.selected_block.get_form_info().forEach((e, i) => {
      let input = $("<input/>", {
        type: e.type,
        value: e.value,
        name: e.variable
      });

      let label = $("<label/>", {
        html: e.name,
        for: e.variable
      });

      let br = $("<br/>");

      $("#edit-panel").append(label);
      $("#edit-panel").append(br);
      $("#edit-panel").append(br);
      $("#edit-panel").append(input);
      $("#edit-panel").append(br);
      $("#edit-panel").append(br);
    });

    let save = $("<input/>", {
      type: "button",
      value: "Save"
    }).click(() => {
      let new_params = {};

      $("#edit-panel :input[type!=button]").each(function () {
        let val = $(this).val();
        let name = $(this).attr("name");
        new_params[name] = val;
      });

      this.selected_block.update_parameters(new_params);
    });

    $("#edit-panel").append(save);
  }
}