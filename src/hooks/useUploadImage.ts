import { useCallback, useState } from "react";

import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import NSFWFilter from "nsfw-filter";
import { v4 as uuidv4 } from "uuid";

export const useUploadImage = (defaultImageURL: string | null) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImageURL, setPreviewImageURL] = useState<string | null>(defaultImageURL);
  const [previousImageURL, setPreviousImageURL] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  // 画像の選択とバリデーション
  const selectImage = useCallback(
    async (files: FileList | null) => {
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

      const isSafe = await NSFWFilter.isSafe(file);
      if (!isSafe) {
        throw new Error("画像に不適切なコンテンツが含まれています。");
      }

      setPreviousImageURL(previewImageURL || defaultImageURL);
      setSelectedImage(file);
      setPreviewImageURL(URL.createObjectURL(file));
    },
    [defaultImageURL, previewImageURL]
  );

  const clearImage = () => {
    if (previewImageURL) {
      setPreviousImageURL(previewImageURL);
    } else {
      setPreviousImageURL(defaultImageURL);
    }
    setPreviewImageURL(null);
    setSelectedImage(null);
  };

  const uploadImage = async (image: File, stringId: string) => {
    const { data: storageData, error: storageError } = await supabase.storage.from(stringId).upload(uuidv4(), image);
    if (storageError) {
      throw storageError;
    }
    const { data: urlData } = supabase.storage.from(stringId).getPublicUrl(storageData.path);
    return urlData.publicUrl;
  };

  const updateImage = async (path: string, image: File, stringId: string) => {
    const { error: replaceError } = await supabase.storage.from(stringId).update(path, image);
    if (replaceError) {
      throw replaceError;
    }
  };

  const removeImage = async (url: string, stringId: string) => {
    const path = url.split("/").slice(-1)[0];
    const { error: removeError } = await supabase.storage.from(stringId).remove([path]);
    if (removeError) {
      throw removeError;
    }
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
    uploadImage,
    updateImage,
    removeImage,
    previousImageURL,
  };
};
