import Link from "next/link";

import { ArrowLeft } from "lucide-react";

type Props = {
  imageUrl: string;
  path: string;
};

const DetailHeaderImage = ({ imageUrl, path }: Props) => {
  return (
    <div className="relative aspect-square">
      <img className="aspect-square" src={imageUrl} alt="chef or recipe image" />
      <Link href={path} className="absolute left-5 top-5 cursor-pointer text-mauve1">
        <ArrowLeft size={32} />
      </Link>
    </div>
  );
};

export default DetailHeaderImage;
