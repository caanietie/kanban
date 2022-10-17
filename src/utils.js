export const throttle = function (func, wait) {
  let prevArgs, argsChanged, result;
  let previous = 0;
  return function () {
    let now, remaining;
    if (wait) {
      now = Date.now();
      remaining = wait - (now - previous);
    }
    argsChanged = JSON.stringify(arguments) !== JSON.stringify(prevArgs);
    prevArgs = { ...arguments };
    if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
      if (wait) previous = now;
      result = func.apply(this, arguments);
    }
    return result;
  }
}