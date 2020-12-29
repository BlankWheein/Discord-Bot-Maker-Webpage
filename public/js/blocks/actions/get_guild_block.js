class GetGuild extends ActionBlock {
  constructor(params){
    super(getParam(params, "position", [0, 0]));

    this.id = getParam(params, "id", "736249300807450665");
    this.save_var = getParam(params, "var", "guild");
    this.print = getParam(params, "print", "Hello");
    
    this.update_text();
  }

  update_text(){
    this.update_dom_text("Get Guild");
  }

  compile_json() {
    let obj = {
      getGuild: {
        id: this.id,
        print: this.print,
        var: this.save_var,
      }
    };

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Id",
        value: this.id,
        type: "text",
        variable: "id"
      },
      {
        name: "Print",
        value: this.print,
        type: "text",
        variable: "print"
      },
      {
        name: "Save Var",
        value: this.save_var,
        type: "text",
        variable: "var"
      }
    ];
  }

  get_custom_variables() {
    return [];
  }
}