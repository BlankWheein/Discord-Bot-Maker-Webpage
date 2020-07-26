jsPlumb.ready(function () {
  const drawer = new ObjectDrawer("canvas");

  $("#add-on-ready").click(() => {
    drawer.draw_block(new OnReadyBlock(position = [0, 0]));
  });

  $("#add-send-message").click(() => {
    drawer.draw_block(new SendMessageBlock(position = [0, 0], "The eval was false", "channel", "", "", "null"));
  });

  $("#add-send-message2").click(() => {
    drawer.draw_block(new SendMessageBlock(position = [0, 0], "The eval was true", "channel", "", "", "null"));
  });

  $("#add-if-statement").click(() => {
    drawer.draw_block(new DecisionBlock(position = [0, 0], "var1", "var2", "=="));
  });

  $("#add-set-var1").click(() => {
    drawer.draw_block(new SetVariableBlock(position = [0, 0], "42", "int", "var1"));
  });

  $("#add-set-var2").click(() => {
    drawer.draw_block(new SetVariableBlock(position = [0, 0], "24", "int", "var2"));
  });

  
  $("#add-set-channel").click(() => {
    drawer.draw_block(new SetChannelBlock(position = [0, 0], 736745607150174288));
  });

  $("#generate-code").click(() => {
    const a = new SequenceParser(drawer);
    a.generate_event_order();
  });
});