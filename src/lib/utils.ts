import { URL } from "url";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type UserLink = {
  url: string;
  siteName: string;
};

const snsOrder = ["youtube", "instagram", "twitter", "facebook"];

export const sortUserLinks = (userLinks: UserLink[]): UserLink[] => {
  return userLinks.sort((a, b) => {
    const aDomain = new URL(a.url).hostname.split(".")[0].toLowerCase();
    const bDomain = new URL(b.url).hostname.split(".")[0].toLowerCase();

    // "youtube", "instagram", "twitter", "facebook"含まれない場合は末尾に配置する
    if (!snsOrder.includes(aDomain) && !snsOrder.includes(bDomain)) {
      return 0;
    }

    return snsOrder.indexOf(aDomain) - snsOrder.indexOf(bDomain);
  });
};
