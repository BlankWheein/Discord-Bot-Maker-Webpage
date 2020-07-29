function isStrInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

function isDefined(value){
  return typeof value != "undefined";
}

function getParam(params, key, default_value){
  if (isDefined(params) && isDefined(params[key])){
    return params[key];
  }else{
    return default_value;
  }
}