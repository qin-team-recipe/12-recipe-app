import { useEffect, useMemo, useState } from "react";

const kBreakPoint = 768;

export const useWindowSize = (): {
  width: number;
  height: number;
  isMobile: boolean;
  isDesktop: boolean;
} => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    // ウィンドウのリサイズ時に呼び出すハンドラ
    function handleResize() {
      // ウィンドウの幅/高さを状態に設定
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // イベントリスナーを追加
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const memoizedWindowSize = useMemo(() => {
    return {
      ...windowSize,
      isMobile: windowSize?.width < kBreakPoint,
      isDesktop: windowSize?.width >= kBreakPoint,
    };
  }, [windowSize]);

  return memoizedWindowSize;
};
