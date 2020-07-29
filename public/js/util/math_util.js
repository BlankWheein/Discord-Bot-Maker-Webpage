function isStrInt(value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
}

function isDefined(value){
  return typeof value != "undefined";
}