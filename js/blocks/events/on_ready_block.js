class OnReadyBlock extends EventBlock {
  constructor(position) {
    super(position);

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