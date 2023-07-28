/**
 * ボタンのダブルチェック機能を実装するためのカスタムフック
 * @returns doubleCheckの真偽値とボタンのpropsを取得する関数を含むオブジェクト
 */
import { useState } from "react";

function callAll<Args extends Array<unknown>>(...fns: Array<((...args: Args) => unknown) | undefined>) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}

export const useDoubleCheck = () => {
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
};
