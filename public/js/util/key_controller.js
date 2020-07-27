const SHIFT_KEY_CODE = 16;

var pressed_keys = {};

window.onkeyup = function (e){
  pressed_keys[e.keyCode] = false;
}

window.onkeydown = function (e){
  pressed_keys[e.keyCode] = true;
}