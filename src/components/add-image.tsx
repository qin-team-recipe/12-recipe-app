"use client";

import { useRef, useState } from "react";

const AddImage = () => {
  const [recipeImages, setRecipeImages] = useState<string[]>([])
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null!)
  
  // input type="file"にフォーカスを当てる
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
    console.log("delete")
  };

  console.log(recipeImages)
  return (
    <div className="mt-4">
      <div className="mx-auto flex w-[86%] flex-wrap gap-4">
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