jsPlumb.ready(function () {

  let instructions_url = window.location.href + "/canvas_instructions";
  fetch(instructions_url).then(response => response.json()).then(json => {
    console.log(json);
    const drawer = new ObjectDrawer("canvas");
    const cmd_loader = new CommandLoader(drawer);
    cmd_loader.draw_command(json);
  });

  $("#add-command").click(() => {
    alert("Add Command");
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