const drawer = new ObjectDrawer(dom_id="canvas");

const a0 = new ActionBlock(name = "RANDOM ACTION", position=[100, 25]);
drawer.draw_block(a0);

const a1 = new ActionBlock(name = "RANDOM ACTION", position=[125, 150]);
drawer.draw_block(a1);

const d0 = new DecisionBlock(var1 = "a", var2 = "b", operator = "<", position=[133, 290]);
drawer.draw_block(d0);

const a2 = new ActionBlock(name = "ACTION IF TRUE", position = [50, 425]);
drawer.draw_block(a2);

const l0 = new LoopBlock(name = "For 1..10", position = [270, 450]);
drawer.draw_block(l0);

const a3 = new ActionBlock(name = "LOOPED ACTION 1", position = [250, 575]);
drawer.draw_block(a3);

const a4 = new ActionBlock(name = "LOOPED ACTION 2", position = [260, 700]);
drawer.draw_block(a4);

const a5 = new ActionBlock(name = "OUT OF LOOP ACTION", position = [525, 490]);
drawer.draw_block(a5);

drawer.draw_connection(a = a0, b = a1, anchor_a = "bottom_center", anchor_b = "top_center");
drawer.draw_connection(a = a1, b = d0, anchor_a = "bottom_center", anchor_b = "top_center");
drawer.draw_connection(a = d0, b = a2, anchor_a = "bottom_left", anchor_b = "top_center");
drawer.draw_connection(a = d0, b = l0, anchor_a = "bottom_right", anchor_b = "top_center");

drawer.draw_connection(a = l0, b = a3, anchor_a = "bottom_center", anchor_b = "top_center");
drawer.draw_connection(a = l0, b = a5, anchor_a = "right", anchor_b = "left");
drawer.draw_connection(a = a3, b = a4, anchor_a = "bottom_center", anchor_b = "top_center");