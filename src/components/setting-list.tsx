"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";

type Props = {
  path?: string;
  text: string;
  icon: ReactNode;
  external?: boolean;
};

const SettingList = ({ path, text, icon, external }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const modalOpen = () => {
    setIsModalOpen(true);
  };
  const handleDelete = () => {
    if (inputValue === "delete") {
      console.log("削除実行");
      setIsModalOpen(false);
    }
    setInputValue("");
  };

  const modal = (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-gray-500/60 p-10"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="" onClick={(e) => e.stopPropagation()}>
        <p className="mb-1 text-white">アカウントを削除するには”delete”と入力してください。</p>
        <div className="block">
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            className="w-full rounded bg-mauve4 py-2 pl-2 placeholder:text-mauve9"
            placeholder="delete"
          />
          <div className="mt-2 flex justify-center">
            <button onClick={handleDelete} className="w-16 rounded bg-red-500 py-2 text-white">
              削除
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {isModalOpen && modal}
      {path ? (
        external ? (
          <a href={path} className="flex cursor-pointer justify-between px-5 py-2 text-mauve1" target="_blank" rel="noopener noreferrer">
            {text && <div className="ml-1 pt-1 text-lg text-mauve12">{text}</div>}
            {icon}
          </a>
        ) : (
          <Link href={path} className={`flex cursor-pointer justify-between px-5 py-2 text-mauve1`}>
            {text && <div className="ml-1 pt-1 text-lg text-mauve12">{text}</div>}
            {icon}
          </Link>
        )
      ) : (
        <button
          onClick={modalOpen}
          className={`flex w-full cursor-pointer items-center justify-between px-5 py-2 text-mauve1`}
        >
          {text && <div className="ml-1 pt-1 text-lg text-mauve12">{text}</div>}
          {icon}
        </button>
      )}
    </div>
  );
};

export default SettingList;
