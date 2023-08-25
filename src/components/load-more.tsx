"use client";

import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

import Spinner from "@/src/components/ui/spinner";

import { kInfiniteScrollCount } from "../constants/constants";
import { useToast } from "./ui/use-toast";

type loadMoreAction = (offset: number) => Promise<readonly [JSX.Element[], number | null]>;

const LoadMore = ({
  children,
  initialOffset,
  loadMoreAction,
}: PropsWithChildren<{
  initialOffset: number;
  loadMoreAction: loadMoreAction;
}>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [loadMoreNodes, setLoadMoreNodes] = useState<JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  // 現在のオフセット
  const currentOffsetRef = useRef<number | undefined>(initialOffset);

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

            // 全てのデータを取得したかどうかのチェック
            if (node.length < kInfiniteScrollCount) {
              setAllDataLoaded(true);
            }

            //　新しいデータを追加する
            setLoadMoreNodes((prev) => [...prev, ...node]);
            if (next === null) {
              currentOffsetRef.current = undefined;
              return;
            }

            currentOffsetRef.current = next;
          })
          .catch((e) => {
            console.log(e);
            // クエリパラメータに日本語を含を含めてServer Actionを使用するとエラーが発生する
            // 以下のPRがマージされたら、エラーが発生しなくなる可能性がある
            // https://github.com/vercel/next.js/pull/53073
            toast({
              variant: "destructive",
              title: "エラーが発生しました🥲",
            });
          })
          .finally(() => setLoading(false));
      }, 800);
    },
    [loadMoreAction, toast]
  );

  useEffect(() => {
    // オブザーバーを使用して、スピナーが表示されたときに新しいデータを取得する
    const abortController = new AbortController();

    const element = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && element?.disabled === false) {
        loadMore(abortController);
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      abortController.abort();
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
      {!allDataLoaded && (
        <button className="w-full self-center" ref={ref}>
          {loading && <Spinner />}
        </button>
      )}
    </>
  );
};

export default LoadMore;
