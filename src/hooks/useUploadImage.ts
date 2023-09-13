import { useCallback, useState } from "react";

export const useUploadImage = (defaultImageURL: string | null) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(defaultImageURL);
  const [previousImageURL, setPreviousImageURL] = useState<string | null>(null);

  // 画像の選択とバリデーション
  const selectImage = useCallback(
    (files: FileList | null) => {
      // ファイルが選択されていない場合
      if (!files || files?.length == 0) {
        throw new Error("画像をアップロードしてください");
      }

      const file = files[0];

      const fileSize = file?.size / 1024 / 1024; // size in MB
      const fileType = files[0]?.type; // MIME type of the file

      // 画像サイズが2MBを超える場合
      if (fileSize > 2) {
        throw new Error("画像サイズを2MB以下にする必要があります。");
      }

      if (fileType !== "image/jpeg" && fileType !== "image/png") {
        throw new Error("画像はjpgまたはpng形式である必要があります。");
      }

      setPreviousImageURL(previewImageURL || defaultImageURL);
      setSelectedImage(file);
      setPreviewImageURL(URL.createObjectURL(file));
    },
    [defaultImageURL, previewImageURL]
  );

  const clearImage = () => {
    setPreviewImageURL(previewImageURL || defaultImageURL);
    setSelectedImage(null);
    setPreviewImageURL(null);
  };

  const isChangedImage = previewImageURL !== defaultImageURL;

  return {
    selectedImage,
    previewImageURL,
    isChangedImage,
    setSelectedImage,
    setPreviewImageURL,
    selectImage,
    clearImage,
    previousImageURL,
  };
};
