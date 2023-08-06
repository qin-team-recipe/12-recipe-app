"use client";

import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

import Spinner from "@/src/components/ui/spinner";

import { useToast } from "./ui/use-toast";

type loadMoreAction<T extends string | number> = (offset: T) => Promise<readonly [JSX.Element, T | null]>;

const LoadMore = <T extends string | number>({
  children,
  initialOffset,
  loadMoreAction,
}: PropsWithChildren<{
  initialOffset: T;
  loadMoreAction: loadMoreAction<T>;
}>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [loadMoreNodes, setLoadMoreNodes] = useState<JSX.Element[]>([]);

  const [disVisible, setDisVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // 現在のオフセット
  const currentOffsetRef = useRef<T | undefined>(initialOffset);

  const { toast } = useToast();

  // 新しいデータを取得する関数
  const loadMore = useCallback(
    async (abortController?: AbortController) => {
      setLoading(true);

      setTimeout(async () => {
        // 重複データの取得を防ぐためのチェック
        if (currentOffsetRef.current === undefined) {
          setLoading(false);
          return;
        }

        loadMoreAction(currentOffsetRef.current)
          .then(([node, next]) => {
            // リクエストが中断された場合は早期リターン
            if (abortController?.signal.aborted) return;

            //　新しいデータを追加する
            setLoadMoreNodes((prev) => [...prev, node]);
            if (next === null) {
              currentOffsetRef.current = undefined;
              setDisVisible(true);
              return;
            }

            currentOffsetRef.current = next;
          })
          .catch((e) => {
            console.log(e);
            // クエリパラメータに日本語を含むServer Actionを使用するとエラーが発生する
            // 以下のPRがマージされたら、エラーが発生しなくなる可能性がある
            // https://github.com/vercel/next.js/pull/53073
            toast({
              variant: "destructive",
              title: "エラーが発生しました🥲",
            });
          })
          .finally(() => setLoading(false));
      }, 300);
    },
    [loadMoreAction, toast]
  );

  useEffect(() => {
    // オブザーバーを使用して、スピナーが表示されたときに新しいデータを取得する
    const signal = new AbortController();

    const element = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && element?.disabled === false) {
        loadMore(signal);
        // 監視を停止する
        observer.unobserve(element);
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      signal.abort();
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [loadMore]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 p-4">
        {children}
        {loadMoreNodes}
      </ul>

      {!disVisible && (
        <div className="flex justify-center">
          <button ref={ref} onClick={() => loadMore()} disabled={loading}>
            {loading && <Spinner />}
          </button>
        </div>
      )}
    </>
  );
};

export default LoadMore;
