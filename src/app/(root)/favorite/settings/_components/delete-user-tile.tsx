import { AlertCircle } from "lucide-react";
import { useState } from "react";

const DeleteUserTile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleModal = () => {
    console.log("open")
    setIsOpen(true)
  }
  return (
    <>
      <button
        onClick={handleModal}
        className={`flex w-full cursor-pointer items-center justify-between py-2 text-mauve1`}
      >
        <div className="ml-1 pt-1 text-lg text-mauve12">退会する</div>
        <AlertCircle className="text-mauve12" />
      </button>
    </>
  );
};

export default DeleteUserTile;
