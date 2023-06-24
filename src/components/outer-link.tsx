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

const OuterLink = ({ siteName, siteUrl }: Props) => {
  const includeTwitter = siteUrl.includes(POPULAR_SNS.TWITTER);
  const includeInstagram = siteUrl.includes(POPULAR_SNS.INSTAGRAM);
  const unincludePopularSns = useMemo(() => {
    if (includeTwitter || includeInstagram) {
      return false;
    } else {
      return true;
    }
  }, [includeTwitter, includeInstagram]);
  return (
    <div className="flex items-center h-extend-22 gap-x-4 p-4 border-b-2">
      {includeTwitter && <TwitterLogo className="rounded-2xl" width={56} height={56} />}
      {includeInstagram && <InstagramLogo className="rounded-2xl" width={56} height={56} />}
      {unincludePopularSns && <SNSLogo className="rounded-2xl" width={56} height={56} />}
      <div className="grid">
        <p className="text-base">{siteName}</p>
        <p className="text-sm text-mauve6">{siteUrl}</p>
      </div>
      <a href={siteUrl} target="_blank" rel="noopener noreferrer">
        <ExternalLink size={24} />
      </a>
    </div>
  );
};

export default OuterLink;
