import { useState } from "react";

import { AlertCircle } from "lucide-react";

const DeleteUserTile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    console.log("open");
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleModal}
        className={`flex h-12 w-full cursor-pointer items-center justify-between text-mauve1`}
      >
        <p className="text-lg text-mauve12">退会する</p>
        <AlertCircle className="text-mauve12" size={20} />
      </button>
    </>
  );
};

export default DeleteUserTile;
