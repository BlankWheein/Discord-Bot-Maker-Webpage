jsPlumb.ready(function () {
  const drawer = new ObjectDrawer("canvas");

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

  $("#add-on-ready").click(() => {
    drawer.draw_block(new OnReadyBlock());
  });

  $("#add-command-block").click(() => {
    drawer.draw_block(new CommandBlock());
  });

  $("#add-send-message").click(() => {
    drawer.draw_block(new SendMessageBlock());
  });

  $("#add-if-statement").click(() => {
    drawer.draw_block(new DecisionBlock());
  });

  $("#add-set-var").click(() => {
    drawer.draw_block(new SetVariableBlock());
  });

  $("#add-cooldown").click(() => {
    drawer.draw_block(new CooldownBlock());
  });
  
  $("#add-set-channel").click(() => {
    drawer.draw_block(new SetChannelBlock());
  });

  $("#add-get-guild").click(() => {
    drawer.draw_block(new GetGuild());
  });

  $("#add-exit-command").click(() => {
    drawer.draw_block(new ExitCommand());
  });

  $("#add-set-category").click(() => {
    drawer.draw_block(new SetCategoryBlock());
  });

  $("#add-set-guild").click(() => {
    drawer.draw_block(new SetGuildBlock());
  });

  $("#add-add-roles").click(() => {
    drawer.draw_block(new AddRolesBlock());
  });
  
  $("#add-remove-roles").click(() => {
    drawer.draw_block(new RemoveRolesBlock());
  });

  $("#add-raise-except").click(() => {
    drawer.draw_block(new RaiseExceptBlock());
  });

  $("#add-append-to-list").click(() => {
    drawer.draw_block(new AppendToListBlock());
  });

  $("#add-create-list").click(() => {
    drawer.draw_block(new CreateListBlock());
  });

  $("#add-get-argument").click(() => {
    drawer.draw_block(new GetArgumentBlock());
  });

  $("#add-get-member").click(() => {
    drawer.draw_block(new GetMemberBlock());
  });

  $("#add-get-role").click(() => {
    drawer.draw_block(new GetRoleBlock());
  });

  $("#add-pin-message").click(() => {
    drawer.draw_block(new PinMessageBlock());
  });

  $("#add-pop-from-list").click(() => {
    drawer.draw_block(new PopFromListBlock());
  });

  $("#add-print").click(() => {
    drawer.draw_block(new PrintBlock());
  });

  $("#add-purge").click(() => {
    drawer.draw_block(new PurgeBlock());
  });

  $("#add-set-pressence").click(() => {
    drawer.draw_block(new SetPressenceBlock());
  });

  $("#add-unpin-message").click(() => {
    drawer.draw_block(new UnpinMessageBlock());
  });

  $("#add-wait").click(() => {
    drawer.draw_block(new WaitBlock());
  });

  $("#add-for-loop").click(() => {
    drawer.draw_block(new ForLoopBlock());
  });

  $("#add-with-typing").click(() => {
    drawer.draw_block(new WithTypingBlock());
  });

  $("#add-try-catch").click(() => {
    drawer.draw_block(new TryCatchBlock());
  });

  $("#add-read-global-variables").click(() => {
    drawer.draw_block(new ReadGlobalVariablesBlock());
  });

  $("#add-write-global-variable").click(() => {
    drawer.draw_block(new WriteGlobalVariableBlock());
  });

  $("#add-change-variable-value").click(() => {
    drawer.draw_block(new ChangeVariableValueBlock());
  });




  $("#add-add-member-var").click(() => {
    drawer.draw_block(new AddMemberVarBlock());
  });

  $("#add-read-member-file").click(() => {
    drawer.draw_block(new ReadMemberFileBlock());
  });

  $("#add-write-member-file").click(() => {
    drawer.draw_block(new WriteMemberFileBlock());
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
            $("#json-output").html(`No event block in command "${e}"`);
          }else if(out.error == "no-event-block"){
            $("#json-output").html(`Infinite loop in command "${e}"`);
          }else{
            $("#json-output").html(`Unknown error in command "${e}"`);
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