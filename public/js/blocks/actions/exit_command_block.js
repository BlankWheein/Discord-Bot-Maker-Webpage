class ExitCommand extends ActionBlock {
  constructor(params){
    super(getParam(params, "position", [0, 0]));
    this.print = getParam(params, "print", "Exitted command");
    
    this.update_text();
  }

  update_text(){
    this.update_dom_text("Exit Command");
  }

  compile_json() {
    let obj = {
      exit_command: {
        print: this.print,
      }
    };

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Print",
        value: this.print,
        type: "text",
        variable: "print"
      }
    ];
  }

  get_custom_variables() {
    return [];
  }
}