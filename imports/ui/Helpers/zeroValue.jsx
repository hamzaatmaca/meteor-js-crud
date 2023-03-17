export const zeroValue = (...args) => {
  args.map((param) => {
    if (typeof param !== "object") throw new Error();
    if (param === undefined || param === null) throw new Error();
    param.current.value = "";
  });
};
