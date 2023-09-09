import { URL } from "url";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * clsxとtwMergeを使用してクラス名を結合
 * @param {ClassValue[]} inputs - 結合するクラス名の配列
 * @returns {string} - 結合されたクラス名
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

type SiteLink = {
  url: string;
  label: string;
};

const snsOrder = ["youtube", "instagram", "twitter", "facebook"];

/**
 * 文字列が有効なURLかどうかを検証
 * @param {string} url - 検証する文字列
 * @returns {boolean} - 文字列が有効なURLの場合はtrue、それ以外の場合はfalse
 */
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 事前に定義された順序に基づいてサイトのリンクをソート
 * @param {string[]} links - リンクの配列
 * @returns {SiteLink[]} - ソートされたサイトリンクの配列
 */
export const sortSiteLinks = (links: string[]): SiteLink[] => {
  if (!links || links.length === 0) return [];

  const validLinks = links.filter((link) => isValidUrl(link));

  const siteLinks: SiteLink[] = validLinks.map((link) => ({
    url: link,
    label: new URL(link).hostname.split(".")[new URL(link).hostname.split(".").length - 2].toLowerCase(),
  }));

  return siteLinks.sort((a, b) => {
    const aDomain = a.label;
    const bDomain = b.label;

    if (!snsOrder.includes(aDomain) && !snsOrder.includes(bDomain)) {
      return 0;
    }
    if (!snsOrder.includes(aDomain)) {
      return 1;
    }
    if (!snsOrder.includes(bDomain)) {
      return -1;
    }

    return snsOrder.indexOf(aDomain) - snsOrder.indexOf(bDomain);
  });
};

type TiptapContent = {
  type: string;
  content?: TiptapContent[];
  text?: string;
};

/**
 * Tiptapコンテンツを表すJSON文字列からプレーンテキストを抽出
 * @param {string} jsonString - JSON文字列
 * @returns {string} - 抽出されたプレーンテキスト
 */
export const getPlainTextFromJSON = (jsonString: string): string => {
  if (!jsonString) return "";

  try {
    const content = JSON.parse(jsonString) as TiptapContent;

    const extractTextFromContent = (contentArray: TiptapContent[]): string => {
      return contentArray
        .map((item) => {
          if (item.type === "paragraph" && item.content) {
            return item.content.map((textItem) => textItem.text || "").join(" ");
          } else if (item.type === "bulletList" || item.type === "orderedList") {
            return extractTextFromContent(item.content || []);
          } else if (item.type === "listItem" && item.content) {
            return extractTextFromContent(item.content);
          } else if (item.type === "image") {
            return "📷";
          }
          return "";
        })
        .filter((text) => text.trim() !== "")
        .join(" ");
    };

    return extractTextFromContent(content.content || []);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return "";
  }
};
