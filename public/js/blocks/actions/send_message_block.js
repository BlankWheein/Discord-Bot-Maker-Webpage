class SendMessageBlock extends ActionBlock {
  constructor(params){
    super(getParam(params, "position", [0, 0]));

    this.message = getParam(params, "message", "Message");
    this.channel = getParam(params, "channel", "channel");
    this.save_var = getParam(params, "var", "msg");
    this.delete_after = getParam(params, "delete_after", "20");
    
    this.update_text();
  }

  update_text(){
    this.update_dom_text("Send \"" + this.message + "\"");
  }

  compile_json() {
    let obj = {
      sendMessage: {
        message: this.message,
        channel: this.channel,
        var: this.save_var,
        delete_after: this.delete_after
      }
    };

    if (typeof obj.sendMessage.delete_after == "string" && !isStrInt(obj.sendMessage.delete_after)) {
      obj.sendMessage.delete_after = null;
    }

    if (typeof obj.sendMessage.delete_after == "number" && !Number.isInteger(obj.sendMessage.delete_after)) {
      obj.sendMessage.delete_after = null;
    }

    return obj;
  }

  get_form_info() {
    return [
      {
        name: "Message",
        value: this.message,
        type: "text",
        variable: "message"
      },
      {
        name: "Channel",
        value: this.channel,
        type: "text",
        variable: "channel"
      },
      {
        name: "Target Variable",
        value: this.save_var,
        type: "text",
        variable: "save_var"
      },
      {
        name: "Delete After",
        value: this.delete_after,
        type: "number",
        variable: "delete_after"
      }
    ];
  }

  get_custom_variables() {
    return [
      this.save_var
    ];
  }
}