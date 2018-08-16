export function isNum(param) {
  if(typeof param !== 'number' || isNaN(param)) {
    throw new Error(`${param} is not a valid number`);
  } else {
    return true;
  }
}
