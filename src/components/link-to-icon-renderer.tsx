import { FC } from "react";

import { Facebook, Instagram, Link, Twitter, Youtube } from "lucide-react";

const IconYoutube = () => <Youtube size={20} className="text-mauve12" />;

const IconInstagram = () => <Instagram size={20} className="text-mauve12" />;

const IconTwitter = () => <Twitter size={20} className="text-mauve12" />;

const IconFacebook = () => <Facebook size={20} className="text-mauve12" />;

const IconLink = () => <Link size={20} className="text-mauve12" />;

type IconComponentsType = {
  [key: string]: FC;
};

const IconComponents: IconComponentsType = {
  youtube: IconYoutube,
  instagram: IconInstagram,
  twitter: IconTwitter,
  facebook: IconFacebook,
  default: IconLink,
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
