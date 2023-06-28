"use client";

import React, { useMemo } from "react";

import { ExternalLink } from "lucide-react";

import InstagramLogo from "../../public/Instagram.svg";
import SNSLogo from "../../public/SNS.svg";
import TwitterLogo from "../../public/Twitter.svg";
import { POPULAR_SNS } from "../constants/constants";

type Props = {
  siteName: string;
  siteUrl: string;
};

const ExternalLinkList = ({ siteName, siteUrl }: Props) => {
  const includeTwitter = siteUrl.includes(POPULAR_SNS.TWITTER);
  const includeInstagram = siteUrl.includes(POPULAR_SNS.INSTAGRAM);
  const includedPopularSns = !(includeTwitter || includeInstagram);
  return (
    <div className="flex h-extend-22 items-center justify-between gap-x-4 border-b-2 p-4">
      {includeTwitter && <TwitterLogo className="rounded-2xl" width={56} height={56} />}
      {includeInstagram && <InstagramLogo className="rounded-2xl" width={56} height={56} />}
      {includedPopularSns && <SNSLogo className="rounded-2xl" width={56} height={56} />}
      <div className="flex flex-1 flex-col">
        <p className="text-mauve12">{siteName}</p>
        <p className="text-sm text-mauve11">{siteUrl}</p>
      </div>
      <a href={siteUrl} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={24} className="text-mauve11" />
      </a>
    </div>
  );
};

export default ExternalLinkList;
