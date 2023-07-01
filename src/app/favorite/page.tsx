import Link from "next/link";

import { FavoriteChefList } from "@/src/components/favorite-chef-list";
import TopBar from "@/src/components/layout/top-bar";
import { AlignLeft, UserCircle2 } from "lucide-react";

const page = () => {
  return (
    <>
      <TopBar
        leadingComponent={
          <Link href={"favorite/setting"}>
            <AlignLeft size={20} className="text-mauve12" />
          </Link>
        }
        centerComponent={<h1 className="font-bold text-mauve12 md:text-xl">お気に入り</h1>}
        trailingComponent={
          <Link href={"/favorite/account"}>
            <UserCircle2 size={20} className="text-mauve12" />
          </Link>
        }
      />
      <FavoriteChefList />
    </>
  );
};

export default page;
