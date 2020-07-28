class OnReadyBlock extends EventBlock {
  constructor(x = 0, y = 0) {
    super([x, y]);

    this.update_text();
  }

  update_text() {
    this.update_dom_text("On Ready");
  }

  compile_json(actions) {
    return {
      on_ready: {
        actions: actions
      }
    };
  }

  get_form_info() {
    return [];
  }
}