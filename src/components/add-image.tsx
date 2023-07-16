"use client";

import { useRef, useState } from "react";

type Props = {};

const AddImage = ({}: Props) => {
  const [recipeImages, setRecipeImages] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null!)

  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


  const onImgSelectBtnClick = () => {
    inputRef.current.click();
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setRecipeImages((prevImages) => [...prevImages, ...imageUrls]);
  }

  const handleImageMouseEnter = (index: number) => {
    setShowDeleteBtn(true);
    setDeleteIndex(index);
  };

  const handleImageMouseLeave = () => {
    setShowDeleteBtn(false);
    setDeleteIndex(null);
  };

  const handleDeleteImage = () => {
    if (deleteIndex !== null) {
      const updatedImgs = [...recipeImages];
      updatedImgs.splice(deleteIndex, 1);
      setRecipeImages(updatedImgs);
      setShowDeleteBtn(false);
      setDeleteIndex(null);
    }
  };

  console.log(recipeImages)
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {recipeImages.map((imgUrl, index) => (
          <div
            key={imgUrl}
            className="relative"
            onMouseEnter={() => handleImageMouseEnter(index)}
            onMouseLeave={handleImageMouseLeave}
          >
            <img
              src={imgUrl}
              alt=""
              className="h-[100px] w-[100px] rounded-lg object-cover"
            />
            {showDeleteBtn && deleteIndex === index && (
              <button
                className="absolute right-[-8px] top-[-8px]"
                onClick={handleDeleteImage}
              >
                <img src="/remove.svg" alt="" />
              </button>
            )}
          </div>
        ))}
        <input hidden ref={inputRef} type="file" accept="image/*" onChange={onFileInputChange} />
        <button
          className="border-mauve6 text-mauve11 h-auto w-[100px] rounded-lg border bg-white py-7 text-[12px]"
          onClick={onImgSelectBtnClick}
        >
          画像を設定
          <img src="/add.svg" alt="" className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default AddImage;