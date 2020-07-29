class CommandSaver {
  constructor(object_drawer) {
    this.object_drawer = object_drawer;
  }

  get_commands_json() {
    let commands = [];
    let connections = [];

    Object.values(this.object_drawer.blocks_objs).forEach(obj => {
      let class_name = obj.constructor.name;

      let position = $(obj.dom).position();
      let pos_x = parseInt(position.left);
      let pos_y = parseInt(position.top);

      let variables = obj.compile_json();
      variables = variables[Object.keys(variables)[0]];

      Object.keys(variables).forEach(e => {
        if (typeof variables[e] == "undefined"){
          delete variables[e];
        }
      });

      let obj_json = {
        command: class_name,
        id: $(obj.dom).attr("id"),
        position: [pos_x, pos_y],
        variables: variables
      };

      commands.push(obj_json);

      obj.connections.forEach(e => {
        connections.push({
          from: $(obj.dom).attr("id"),
          to: $(e.target_block.dom).attr("id"),
          label: e.connection_type
        });
      });
    });

    return {
      commands: commands,
      connections: connections
    };
  }
}