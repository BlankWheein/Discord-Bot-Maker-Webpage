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
        connector: "StateMachine"
      },
      "decision": {
        anchor: "Continuous",
        connector: "StateMachine",
        overlays: [
          ["Label", { label: "true", location: 0.5, id: "conn_label" }]
        ]
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
    let conn_types = {
      "EventBlock": "basic",
      "ActionBlock": "basic",
      "DecisionBlock": "decision"
    }

    let conn_type = conn_types[$(node_dom).attr("id").split("_")[0]];

    this.instance.draggable(node_dom);

    this.instance.makeSource(node_dom, {
      filter: ".ep",
      anchor: "Continuous",
      connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
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
      anchor: "Continuous",
      allowLoopback: false
    });
  }
}