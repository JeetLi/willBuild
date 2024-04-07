export function throttle(func: Function, ms: number): Function {
  let locked: boolean = false;

  return function (this: any, ...args: any[]) {
    if (locked) return;

    const context = this;
    const argumentsArray = args;

    locked = true;

    setTimeout(() => {
      func.apply(context, argumentsArray);
      locked = false;
    }, ms);
  };
}
