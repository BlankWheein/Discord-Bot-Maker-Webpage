class SendMessageBlock extends ActionBlock {
  constructor(params){
    super(getParam(params, "position", [0, 0]));

    this.params = params;
    this.json_compiler = {
      sendMessage: {}
    }

    this.delete_after = getParam(params, "delete_after", "20");
    
    this.add_field("Message", "text", "message");
    this.add_field("Channel", "text", "channel");
    this.add_field("var", "text", "var", true);
    this.add_field("Delete After", "int", "delete_after")
    this.add_print();

    this.update_text();
  }

  update_text(){
    this.update_dom_text("Send \"" + this.message + "\"");
  }

  compile_json() {
    let obj = this.json_compiler;

    if (typeof obj.sendMessage.delete_after == "string" && !isStrInt(obj.sendMessage.delete_after)) {
      obj.sendMessage.delete_after = null;
    }

    if (typeof obj.sendMessage.delete_after == "number" && !Number.isInteger(obj.sendMessage.delete_after)) {
      obj.sendMessage.delete_after = null;
    }

    return obj;
  }
}