class Canvas{
  constructor(canvas_id){
    this.canvas_id = canvas_id;

    this.instance = jsPlumb.getInstance({
      Endpoint: ["Dot", { radius: 2 }],
      Connector: "StateMachine",
      HoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 },
      ConnectionOverlays: [
        ["Arrow", {
          location: 1,
          id: "arrow",
          length: 14,
          foldback: 0.8
        }]
      ],
      Container: "canvas"
    });

    this.instance.registerConnectionTypes({
      "basic": {
        anchor: "Continuous",
        connector: "StateMachine",
        paintStyle: {
          stroke: "#5c96bc",
          strokeWidth: 2,
          outlineStroke: "transparent",
          outlineWidth: 4
        }
      },
      "decision": {
        anchor: "Continuous",
        connector: "StateMachine",
        paintStyle: {
          stroke: "#5c96bc",
          strokeWidth: 2,
          outlineStroke: "transparent",
          outlineWidth: 4
        }
      }
    });
  }

  create_block(id, pos){
    let dom = document.createElement("div");

    dom.className = "w";
    dom.id = id;
    dom.innerHTML = "<div class=\"ep\"></div>";
    dom.style.left = pos[0] + "px";
    dom.style.top = pos[1] + "px";

    this.instance.getContainer().appendChild(dom);
    this.init_node(dom);

    return dom;
  }

  init_node(node_dom){
    let conn_type = "basic";

    let block_name = $(node_dom).attr("id").split("_")[0];
    let other_conn_types = {
      "DecisionBlock": "decision"
    }

    if (block_name in other_conn_types){
      conn_type = other_conn_types[block_name];
    }

    this.instance.draggable(node_dom);

    this.instance.makeSource(node_dom, {
      filter: ".ep",
      connectionType: conn_type,
      extract: {
        "action": "the-action"
      },
      maxConnections: 4,
      onMaxConnections: function (info, e) {
        alert("Maximum connections (" + info.maxConnections + ") reached");
      }
    });

    this.instance.makeTarget(node_dom, {
      dropOptions: { hoverClass: "dragHover" },
      connectionType: conn_type,
      allowLoopback: false
    });
  }
}