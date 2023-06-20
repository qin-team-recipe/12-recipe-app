"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

type Props = {
  imageUrl: string;
};

const DetailHeaderImage = ({ imageUrl }: Props) => {
  const router = useRouter();
  return (
    <div className="relative aspect-square">
      <img className="aspect-square" src={imageUrl} alt="chef or recipe image" />
      <button className="absolute top-5 left-5 text-white cursor-pointer" onClick={() => router.back()}>
        <ArrowLeft size={32} />
      </button>
    </div>
  );
};

export default DetailHeaderImage;
