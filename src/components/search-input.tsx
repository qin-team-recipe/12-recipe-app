"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ArrowLeft, Search, X } from "lucide-react";

import { searchBasePath } from "../constants/routes";
import { Input } from "./ui/input";
import Spinner from "./ui/spinner";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  // 遷移状態を処理するためのフック
  const [isPending, startTransition] = useTransition();

  // 検索パラメータを処理する
  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      // TODO: window.location.searchが必要かどうかを再検証する
      const params = new URLSearchParams(window.location.search);

      const currentSearchValue = params.get("search");
      if (debouncedValue !== currentSearchValue) {
        if (debouncedValue.length > 0) {
          params.set("search", debouncedValue);
        } else {
          params.delete("search");
        }

        startTransition(() => {
          const newPath =
            pathname === "/" ? `${searchBasePath}/recipes/?${params.toString()}` : `${pathname}/?${params.toString()}`;

          router.replace(newPath);
        });
      }
    },
    [router, pathname]
  );

  // URLのクエリパラメータを取得してinputValueにセットする
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search") ?? "";
    if (searchQuery !== inputValue) {
      setInputValue(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // デバウンスされた値がある場合、マウントされたことを示す
  useEffect(() => {
    if (debouncedValue.length > 0) {
      setMounted(true);
    }
  }, [debouncedValue]);

  // 入力デバウンスを処理する
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  // マウントおよびデバウンスされた値が変更されたときに検索パラメータを処理する
  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className="flex w-full gap-2">
      {pathname.includes(searchBasePath) && (
        <button
          onClick={() => {
            router.replace("/");
          }}
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </button>
      )}

      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2" size={16} />
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="シェフやレシピを検索"
          className="bg-mauve4 pl-10 placeholder:font-bold placeholder:text-mauve9 focus:border"
        />
        {isPending && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        )}
        {!(pathname === "/") && inputValue && !isPending && (
          <button
            onClick={() => setInputValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
