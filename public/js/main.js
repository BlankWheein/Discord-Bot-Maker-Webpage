jsPlumb.ready(function () {
  const drawer = new ObjectDrawer("canvas");

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