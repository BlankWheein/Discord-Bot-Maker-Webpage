class SetChannelBlock extends ActionBlock {
  constructor(position, id) {
    let name = "Set channel = " + id + "";
    
    super(name, position);
    this.id = id;
  }

  compile_json() {
    return {
      setChannel: {
        id: this.id
      }
    };
  }
}