class ExitCommand extends ActionBlock {
  constructor(params){
    super(getParam(params, "position", [0, 0]));

    this.json_compiler = {
      exit_command: {}
    }

    this.add_print();

    this.update_text();
  }

  update_text(){
    this.update_dom_text("Exit Command");
  }

}