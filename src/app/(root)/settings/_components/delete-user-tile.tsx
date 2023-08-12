"use client";

import { useState } from "react";

import { AlertCircle } from "lucide-react";

const DeleteUserTile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    console.log("open");
    setIsOpen(true);
  };

  return (
    <button onClick={handleModal} className="flex h-12 w-full cursor-pointer items-center justify-between">
      退会する
      <AlertCircle size={20} />
    </button>
  );
};

export default DeleteUserTile;
