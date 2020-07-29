class OnReadyBlock extends EventBlock {
  constructor(params) {
    super(isDefined(params["position"]) ? params["position"] : [0, 0]);

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

  get_custom_variables() {
    return [];
  }
}