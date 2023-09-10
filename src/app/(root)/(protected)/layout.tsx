import Link from "next/link";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";
import { AlignLeft, UserCircle2 } from "lucide-react";

import TopBar from "@/src/components/layout/top-bar";
import SuggestLogin from "@/src/components/suggest-login";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthenticatedUser();

  //TODO:お気に入りページか買い物リストページかを出し分けしたい
  const isFavorite = true;

  return (
    <>
      <TopBar
        leadingComponent={
          <Link href={"/settings"}>
            <AlignLeft size={20} className="text-mauve12" />
          </Link>
        }
        centerComponent={
          <h1 className="font-bold text-mauve12 md:text-xl">{isFavorite ? "お気に入り" : "買い物リスト"}</h1>
        }
        trailingComponent={
          user &&
          isFavorite && (
            <Link href={"/my-page"}>
              <UserCircle2 size={20} className="text-mauve12" />
            </Link>
          )
        }
      />
      {user ? children : <SuggestLogin page={isFavorite ? "Favorite" : "ShoppingList"} />}
    </>
  );
};

export default layout;
