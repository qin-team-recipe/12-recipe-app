import { URL } from "url";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SiteLink = {
  url: string;
  label: string;
};

const snsOrder = ["youtube", "instagram", "twitter", "facebook"];

export const sortSiteLinks = (links: string[]): SiteLink[] => {
  // ホスト名を分割
  const siteLinks: SiteLink[] = links.map((link) => ({
    url: link,
    label: new URL(link).hostname.split(".")[new URL(link).hostname.split(".").length - 2].toLowerCase(),
  }));

  // ホスト名の最後の部分であるドメインを抽出
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
