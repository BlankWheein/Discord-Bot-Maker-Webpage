class ObjectDrawer extends Canvas{
  constructor(canvas_id){
    super(canvas_id);
    this.block_type_counter = {};
    this.blocks_objs = {};
    this.selected_block = undefined;

    let ctx = this;

    this.instance.bind("connection", function (info) {
      let conn_type = "";
      if (info.connection.connector.canvas.nextSibling) {
        conn_type = info.connection.connector.canvas.nextSibling.innerText;
      }

      ctx.blocks_objs[info.sourceId].connections.push({
        target_block: ctx.blocks_objs[info.targetId],
        connection_type: conn_type
      });

      // If the connection is of "decision" type
      if (info.connection.hasType("decision")){
        info.connection.bind("click", function (conn, originalEvent) {
          let labels = ["true", "false", "either"];
          let new_label = labels[(labels.indexOf(conn.label) + 1) % labels.length];
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

    this.instance.bind("connectionDetached", function (c) {
      ctx.blocks_objs[c.sourceId].connections = ctx.blocks_objs[c.sourceId].connections.filter(
        e => $(e.target_block.dom).attr("id") != c.targetId
      );
    });

    this.instance.bind("connectionDrag", function (conn) {
      let conn_type = "";
      if (conn.connector.canvas.nextSibling) {
        conn_type = conn.connector.canvas.nextSibling.innerText;
      }

      if (conn.hasType("decision")) {
        let labels = ["true", "false", "either"];
        if (conn_type == "") {
          conn.addOverlay(["Label", { label: labels[0], location: 0.5, id: "conn_label" }]);
        }
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

  connect_blocks(a, b, type="basic", label){
    let overlays = [];

    if (label && label.length > 0) {
      overlays.push(["Label", { label: label, location: 0.5, id: "conn_label" }]);
    }

    this.instance.connect({
      source: a,
      target: b,
      type: type,
      overlays: overlays
    });
  }

  draw_block(block, set_id){
    let block_type = block.constructor.name;
    if(block instanceof EventBlock){
      block_type = EventBlock.name;
    }

    let connection_type = "basic";
    if (block instanceof DecisionBlock) {
      connection_type = "decision";
    }

    if(set_id){
      var id = set_id;
      let block_type = set_id.split("_")[0];
      let block_indx = parseInt(set_id.split("_")[1]);
      this.block_type_counter[block_type] = block_indx + 1;
    }else{
      if (block_type in this.block_type_counter){
        var id = block_type + "_" + this.block_type_counter[block_type];
        this.block_type_counter[block_type]++;
      }else{
        var id = block_type + "_0";
        this.block_type_counter[block_type] = 1;
      }
    }

    this.blocks_objs[id] = block;

    let dom = this.create_block(id, block.position, connection_type);
    block.assign_dom(dom);

    this.instance.addEndpoint(id, {
      connectionType: connection_type
    }); 

    let ctx = this;
    $(dom).click(() => {
      // If the node was clicked while the Shift key was held
      if (pressed_keys[SHIFT_KEY_CODE]) {
        // delete ctx.blocks_objs[$(dom).attr("id")];
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
      let group = $("<div/>", {
        class: "form-group"
      });

      if (Array.isArray(e.type)){
        var input = $("<select/>", {
          name: e.variable,
          class: "form-control"
        });

        e.type.forEach((ith_type, i) => {
          input.append($("<option/>", {
            html: ith_type,
            selected: ith_type == e.value
          }));
        });
      }else{
        var input = $("<input/>", {
          type: e.type,
          value: e.value,
          name: e.variable,
          class: "form-control"
        });
      }

      let label = $("<label/>", {
        html: e.name,
        for: e.variable
      });

      group.append(label);
      group.append(input);

      $("#edit-panel").append(group);
    });

    let save = $("<input/>", {
      type: "button",
      value: "Save",
      class: "btn btn-primary btn-block"
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