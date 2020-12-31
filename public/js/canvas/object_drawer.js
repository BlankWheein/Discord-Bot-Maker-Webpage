class ObjectDrawer extends Canvas{
  constructor(canvas_id){
    super(canvas_id);

    this.block_id_counter = 0;
    this.used_ids = [];

    this.defined_variables = [];

    this.blocks_objs = {};
    this.selected_block = undefined;

    let ctx = this;

    this.instance.bind("connection", function (info) {
      let conn_type = ctx.get_label_from_conn(info.connection);

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

          ctx.blocks_objs[info.sourceId].connections.forEach(e => {
            if (e.target_block.dom.id == info.connection.targetId) {
              e.connection_type = new_label;
            }
          });
        });
      } else if (info.connection.hasType("trycatch")){
        info.connection.bind("click", function (conn, originalEvent) {
          let labels = ["try", "catch", "end"];
          let new_label = labels[(labels.indexOf(conn.label) + 1) % labels.length];
          info.connection.removeOverlay("conn_label");
          info.connection.addOverlay(["Label", { label: new_label, location: 0.5, id: "conn_label" }]);

          ctx.blocks_objs[info.sourceId].connections.forEach(e => {
            if (e.target_block.dom.id == info.connection.targetId) {
              e.connection_type = new_label;
            }
          });
        });
      }
      else if (info.connection.hasType("loop")){
        info.connection.bind("click", function (conn, originalEvent) {
          let labels = ["loop", "end"];
          let new_label = labels[(labels.indexOf(conn.label) + 1) % labels.length];
          info.connection.removeOverlay("conn_label");
          info.connection.addOverlay(["Label", { label: new_label, location: 0.5, id: "conn_label" }]);

          ctx.blocks_objs[info.sourceId].connections.forEach(e => {
            if (e.target_block.dom.id == info.connection.targetId) {
              e.connection_type = new_label;
            }
          });
        });
      }
      else if (info.connection.hasType("withtyping")){
        info.connection.bind("click", function (conn, originalEvent) {
          let labels = ["withtyping", "end"];
          let new_label = labels[(labels.indexOf(conn.label) + 1) % labels.length];
          info.connection.removeOverlay("conn_label");
          info.connection.addOverlay(["Label", { label: new_label, location: 0.5, id: "conn_label" }]);

          ctx.blocks_objs[info.sourceId].connections.forEach(e => {
            if (e.target_block.dom.id == info.connection.targetId) {
              e.connection_type = new_label;
            }
          });
        });
      } 
    });

    this.instance.bind("connectionDetached", function (c) {
      ctx.blocks_objs[c.sourceId].connections = ctx.blocks_objs[c.sourceId].connections.filter(
        e => $(e.target_block.dom).attr("id") != c.targetId
      );
    });

    this.instance.bind("connectionDrag", function (conn) {
      let conn_type = ctx.get_label_from_conn(conn);

      if (conn.hasType("decision") && conn_type == "") {
        conn.addOverlay(["Label", { label: "true", location: 0.5, id: "conn_label" }]);
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

  connect_blocks(a, b, label){
    let overlays = [];

    if (label && label.length > 0) {
      overlays.push(["Label", { label: label, location: 0.5, id: "conn_label" }]);
    }

    let connection_type = this.get_connection_type(this.blocks_objs[a]);

    this.instance.connect({
      source: a,
      target: b,
      type: connection_type,
      overlays: overlays
    });
  }

  draw_block(block, set_id){
    let connection_type = this.get_connection_type(block);

    if(set_id){
      var id = set_id;
    }else{
      var id = "block_" + this.block_id_counter;
      this.block_id_counter++;

      while (this.used_ids.includes(id)){
        id = "block_" + this.block_id_counter;
        this.block_id_counter++;
      }
    }

    this.used_ids.push(id);
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
        delete ctx.blocks_objs[$(dom).attr("id")];
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

  get_label_from_conn(conn){
    let label = "";
    if (conn.connector.canvas.nextSibling) {
      label = conn.connector.canvas.nextSibling.innerText;
    }

    return label;
  }

  get_connection_type(block){
    let connection_type = "basic";
    if (block instanceof DecisionBlock) {
      connection_type = "decision";
    } else if (block instanceof ForLoopBlock) {
      connection_type = "loop";
    } else if (block instanceof WithTypingBlock) {
      connection_type = "withtyping";
    } else if (block instanceof TryCatchBlock) {
      connection_type = "trycatch";
    }

    return connection_type;
  }
}