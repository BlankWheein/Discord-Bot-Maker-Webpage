const drawer = new ObjectDrawer("canvas");

jsPlumb.ready(function () {
  let instructions_url = window.location.href + "/canvas-instructions";
  fetch(instructions_url).then(response => response.json()).then(json => {
    const cmd_loader = new CommandLoader(drawer);
    cmd_loader.draw_command(json.response);
  });

  $("#save-command").click(() => {
    const cmd_saver = new CommandSaver(drawer);
    let commands_json = JSON.stringify(cmd_saver.get_commands_json());
    console.log(cmd_saver.get_commands_json());

    let command_save_url = window.location.href + "/save";
    $.post(command_save_url, { command_json: commands_json }, function (result) {
      console.log(result);
    });
  });

  $("#delete-command").click(() => {
    let command_delete_url = window.location.href + "/delete";

    $.post(command_delete_url, { }, function (result) {
      document.location.href = `/`;
    });
  });

  $("#add-command").click(() => {
    console.log("dfuihsdui");
    let command_name = prompt("New command name:", "New Command");

    if(command_name != null){
      document.location.href = `/commands/${command_name}/create`;
    }
  });

  $("#copy-code").click(() => {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#json-output").text()).select();
    document.execCommand("copy");
    $temp.remove();
  });

  $("#generate-code").click(() => {
    let all_instructions_url = "/commands/get-all-instructions";
    let final_json = {};

    $("<div>", { id: "fake-canvas" }).appendTo($("#generate-code"));

    fetch(all_instructions_url).then(response => response.json()).then(json => {
      Object.keys(json.response).forEach(cmd_name => {
        let cmd_drawer = new ObjectDrawer("fake-canvas");
        const cmd_loader = new CommandLoader(cmd_drawer);
        cmd_loader.draw_command(json.response[cmd_name]);
        
        const a = new SequenceParser(cmd_drawer);
        let out = a.generate_event_order();

        if("error" in out){
          if(out.error == "no-event-block"){
            $("#json-output").html(`No event block in command "${cmd_name}"`);
          }else if(out.error == "no-event-block"){
            $("#json-output").html(`Infinite loop in command "${cmd_name}"`);
          }else{
            $("#json-output").html(`Unknown error in command "${cmd_name}"`);
          }

          final_json = {};
          return;
        }

        final_json = {...final_json, ...out};
      });

      if(final_json != {}){
        console.log(final_json);
        $("#json-output").html(JSON.stringify(final_json));
      }
    });

    $("#generate-code").remove("#fake-canvas");
  });
});