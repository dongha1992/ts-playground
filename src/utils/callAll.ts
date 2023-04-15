type FunctionArguments<T extends (...args: any[]) => any> = T extends (...args: infer A) => any ? A : never;

const callAll =
  <T extends ((...args: any[]) => any)[]>(...fns: T) =>
  (...args: FunctionArguments<T[number]>): void => {
    return fns.forEach(fns => fns && fns(...args));
  };

export { callAll };
