import { useCallback, useState } from "react";

export const useUploadImage = (defaultImageURL: string | null) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(defaultImageURL);

  // 画像の選択とバリデーション
  const selectImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    // ファイルが選択されていない場合
    if (!file || file?.length == 0) {
      throw new Error("画像をアップロードしてください");
    }

    const fileSize = file[0]?.size / 1024 / 1024; // size in MB
    const fileType = file[0]?.type; // MIME type of the file

    // 画像サイズが2MBを超える場合
    if (fileSize > 2) {
      throw new Error("画像サイズを2MB以下にする必要があります。");
    }

    // ファイル形式がjpgまたはpngでない場合
    if (fileType !== "image/jpeg" && fileType !== "image/png") {
      throw new Error("画像はjpgまたはpng形式である必要があります。");
    }

    // 画像をセット
    setSelectedImage(file[0]);
    // 画像のプレビューをセット
    setPreviewImageURL(URL.createObjectURL(file[0]));
  }, []);

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewImageURL(null);
  };

  const isChangedImage = previewImageURL === defaultImageURL;

  return {
    selectedImage,
    previewImageURL,
    isChangedImage,
    setSelectedImage,
    setPreviewImageURL,
    selectImage,
    clearImage,
  };
};
