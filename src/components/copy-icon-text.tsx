"use client";

import { Copy } from "lucide-react";

type Props = {};

const CopyIconText = ({}: Props) => {
  return (
    <div className="flex justify-end px-4 pt-2 text-blue-400">
      <Copy size={16} />
      <p className="text-xs">コピーする</p>
    </div>
  );
};

export default CopyIconText;
