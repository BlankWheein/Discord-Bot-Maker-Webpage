class SendMessageBlock extends ActionBlock {
  constructor(position, message, channel, target, save_var, delete_after) {
    let name = "Send \"" + message + "\"";
    
    super(name, position);
    this.message = message;
    this.channel = channel;
    this.target = target;
    this.save_var = save_var;
    this.delete_after = delete_after;
  }

  compile_json() {
    return {
      sendMessage: {
        message: this.message,
        channel: this.channel,
        target: this.target,
        var: this.save_var,
        delete_after: this.delete_after
      }
    };
  }
}