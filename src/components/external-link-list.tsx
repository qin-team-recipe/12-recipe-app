"use client";

import { ExternalLink } from "lucide-react";

import InstagramLogo from "../../public/Instagram.svg";
import SNSLogo from "../../public/SNS.svg";
import TwitterLogo from "../../public/Twitter.svg";
import YoutubeLogo from "../../public/Youtube.svg";
import { POPULAR_SNS } from "../constants/constants";

type Props = {
  siteName: string;
  siteUrl: string;
};

const ExternalLinkList = ({ siteName, siteUrl }: Props) => {
  const includeTwitter = siteUrl.includes(POPULAR_SNS.TWITTER);
  const includeInstagram = siteUrl.includes(POPULAR_SNS.INSTAGRAM);
  const includeYoutube = siteUrl.includes(POPULAR_SNS.YOUTUBE);
  const includedPopularSns = !(includeTwitter || includeInstagram || includeYoutube);
  return (
    <div className="flex items-center justify-between gap-x-4 border-b-2 p-4">
      {includeTwitter && <TwitterLogo className="rounded" width={36} height={36} />}
      {includeInstagram && <InstagramLogo className="rounded" width={36} height={36} />}
      {includeYoutube && <YoutubeLogo className="rounded" width={36} height={36} />}
      {includedPopularSns && <SNSLogo className="rounded" width={36} height={36} />}
      <div className="flex flex-1 flex-col">
        <p className="text-base text-mauve12">{siteName}</p>
      </div>
      <a href={siteUrl} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={24} className="text-mauve11" />
      </a>
    </div>
  );
};

export default ExternalLinkList;
