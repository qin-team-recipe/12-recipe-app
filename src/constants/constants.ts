/**
 * 頻繁に使用する文字列リスト
 */

export const CONSTANTS = {
  /** お気に入り */
  FAVORITE: "お気に入り",

  /** シェフ */
  CHEF: "シェフ",

  /** レシピ */
  RECIPE: "レシピ",

  /** レシピ */
  LINK: "リンク",

  /** フォロワー */
  FOLLOWER: "フォロワー",

  /** 注目のシェフ */
  TOPIC_CHEF: "注目のシェフ",

  /** 話題のレシピ */
  TOPIC_RECIPE: "話題のレシピ",

  /** 作り方 */
  HOW_TO_COOK: "注目のシェフ",

  /** 材料 */
  INGREDIENTS: "話題のレシピ",
};

/**
 * 有名SNSの定数
 * この名前がURLに含まれている場合はその企業のアイコンを表示する
 */

export const POPULAR_SNS = {
  INSTAGRAM: "instagram",
  TWITTER: "twitter",
  YOUTUBE: "youtube",
};

// トーストの表示時間
export const kToastDuration = 3000;

// 無限スクロールで追加で取得する件数
export const kInfiniteScrollCount = 10;

export const ROLE_TYPE = {
   USER:'USER',
} as const
