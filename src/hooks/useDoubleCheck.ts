import { useState } from "react";

function callAll<Args extends Array<unknown>>(...fns: Array<((...args: Args) => unknown) | undefined>) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

export function useDoubleCheck() {
  const [doubleCheck, setDoubleCheck] = useState(false);

  function getButtonProps(props?: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const onBlur: React.ButtonHTMLAttributes<HTMLButtonElement>["onBlur"] = () => setDoubleCheck(false);

    const onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = doubleCheck
      ? undefined
      : (e) => {
          e.preventDefault();
          setDoubleCheck(true);
        };

    return {
      ...props,
      onBlur: callAll(onBlur, props?.onBlur),
      onClick: callAll(onClick, props?.onClick),
    };
  }

  return { doubleCheck, getButtonProps };
}
