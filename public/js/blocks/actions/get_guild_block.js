class GetGuild extends ActionBlock {
  constructor(params){
    super(getParam(params, "position", [0, 0]));

    this.type = getParam(params, "type", "id");
    this.id = getParam(params, "id", "0");
    this.name = getParam(params, "name", "def_name");
    this.print = getParam(params, "print", "Hello");
    
    this.update_text();
  }

  update_text(){
    this.update_dom_text("Get Guild");
  }

  compile_json() {
    let obj = {
      getGuild: {
        type: this.type,
        id: this.id,
        name: this.name,
        print: this.print,
      }
    };

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Type",
        value: this.type,
        type: [
          "id", "name"
        ],
        variable: "type"
      },
      {
        name: "Id",
        value: this.id,
        type: "text",
        variable: "id"
      },
      {
        name: "Name",
        value: this.name,
        type: "text",
        variable: "name"
      },
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