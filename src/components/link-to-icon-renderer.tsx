import { FC } from "react";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconLink,
} from "@tabler/icons-react";

const IconYoutube = () => <IconBrandYoutube size={20} className="text-mauve12" />;

const IconInstagram = () => <IconBrandInstagram size={20} className="text-mauve12" />;

const IconTwitter = () => <IconBrandTwitter size={20} className="text-mauve12" />;

const IconFacebook = () => <IconBrandFacebook size={20} className="text-mauve12" />;

const IconDefaultLink = () => <IconLink size={20} className="text-mauve12" />;

type IconComponentsType = {
  [key: string]: FC;
};

const IconComponents: IconComponentsType = {
  youtube: IconYoutube,
  instagram: IconInstagram,
  twitter: IconTwitter,
  facebook: IconFacebook,
  default: IconDefaultLink,
};

type Props = {
  links: string[];
};

const LinkToIconRenderer = ({ links }: Props) => {
  return links.map((link, index) => {
    const urlParts = new URL(link).hostname.split(".");
    const domain = urlParts[urlParts.length - 2].toLowerCase();
    const Icon = IconComponents[domain] || IconComponents.default;

    return (
      <a key={index} href={link} target="_blank" rel="noopener noreferrer">
        <Icon />
      </a>
    );
  });
};

export default LinkToIconRenderer;
