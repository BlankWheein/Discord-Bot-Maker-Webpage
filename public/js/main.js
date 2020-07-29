jsPlumb.ready(function () {
  const drawer = new ObjectDrawer("canvas");

  let instructions_url = window.location.href + "/canvas_instructions";
  fetch(instructions_url).then(response => response.json()).then(json => {
    const cmd_loader = new CommandLoader(drawer);
    cmd_loader.draw_command(json.response);
  });

  $("#save-command").click(() => {
    const cmd_saver = new CommandSaver(drawer);
    let commands_json = JSON.stringify(cmd_saver.get_commands_json());
    console.log(cmd_saver.get_commands_json());

    let command_save_url = window.location.href + "/save_command";
    $.post(command_save_url, { command_json: commands_json }, function (result) {
      console.log(result);
    });
  });

  $("#add-on-ready").click(() => {
    drawer.draw_block(new OnReadyBlock());
  });

  $("#add-send-message").click(() => {
    drawer.draw_block(new SendMessageBlock());
  });

  $("#add-if-statement").click(() => {
    drawer.draw_block(new DecisionBlock());
  });

  $("#add-set-var").click(() => {
    drawer.draw_block(new SetVariableBlock());
  });
  
  $("#add-set-channel").click(() => {
    drawer.draw_block(new SetChannelBlock());
  });

  $("#generate-code").click(() => {
    const a = new SequenceParser(drawer);
    a.generate_event_order();
  });
});