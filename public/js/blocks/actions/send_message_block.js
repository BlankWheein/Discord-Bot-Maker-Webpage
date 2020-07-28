class SendMessageBlock extends ActionBlock {
  constructor(x = 0, y = 0, message="", channel="channel", save_var="var1", delete_after=20) {
    super([x, y]);

    this.message = message;
    this.channel = channel;
    this.save_var = save_var;
    this.delete_after = delete_after;

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

    if (!isNaN(obj.sendMessage.channel)){
      obj.sendMessage.channel = parseInt(obj.sendMessage.channel);
    }

    if (isNaN(obj.sendMessage.delete_after) || obj.sendMessage.delete_after <= 0) {
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
}