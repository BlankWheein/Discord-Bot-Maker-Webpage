class OnReadyBlock extends EventBlock {
  constructor(position) {
    let name = "On Ready";
    super(name, position);
  }

  compile_json(actions) {
    return {
      on_ready: {
        actions: actions
      }
    };
  }
}