"use server";

import { ActionsResult } from "@/src/types/ActionsResult";
import { Database } from "@/src/types/SupabaseTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

const supabase = createClientComponentClient<Database>();

export const uploadImage = async (formData: FormData): Promise<ActionsResult & { storageUrl: string | null }> => {
  const image = formData.get("selectedImage") as File;

  try {
    const { data: storageData, error: storageError } = await supabase.storage.from("user").upload(uuidv4(), image);
    // エラーチェック
    if (storageError) {
      return {
        isSuccess: false,
        error: storageError.message,
        storageUrl: null,
      };
    }

    // ユーザテーブルのプロフィール画像を設定するためにsupabaseストレージのURLを取得する
    const { data: urlData } = supabase.storage.from("user").getPublicUrl(storageData.path);

    return {
      isSuccess: true,
      message: "アップロード成功",
      storageUrl: urlData.publicUrl,
    };
  } catch (error) {
    return {
      isSuccess: false,
      error: "アップロード処理に失敗しました",
      storageUrl: null,
    };
  }
};
