import Link from "next/link";

import { getRecipeById } from "@/src/actions/getRecipeById";
import DetailHeaderImage from "@/src/components/detail-header-image";
import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import NumberUnit from "@/src/components/number-unit";
import ProfileLink from "@/src/components/profile-link";
import ToggleButton from "@/src/components/toggle-button";
import { Command, CommandItem, CommandList, CommandSeparator } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";
import { CircleEllipsis, Copy, Lock, Pencil, Trash } from "lucide-react";

type Props = {
  id: string;
  path: string;
};

const RecipeHero = async ({ id, path }: Props) => {
  const { title, description, user, isMe, RecipeLink: recipeLinks } = await getRecipeById(id);

  return (
    <>
      {/* // TODO: 画像を設定する */}
      {/* <DetailHeaderImage
        imageUrl={
          "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=667&q=80"
        }
      /> */}
      <div className="grid gap-4 p-4">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <h6 className="text-xl font-bold text-mauve12">{title}</h6>
            <div className="ml-3 flex items-center gap-3">
              <LinkToIconRenderer links={recipeLinks.map((link) => link.linkUrl)} />
              {isMe && (
                <Popover>
                  <PopoverTrigger>
                    <CircleEllipsis size={20} />
                  </PopoverTrigger>
                  <PopoverContent align="end" className="p-2">
                    <Command className="w-full">
                      <CommandList>
                        <CommandItem>
                          <Link href={"/my-page/edit"} className="flex">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>編集する</span>
                          </Link>
                        </CommandItem>
                        <CommandItem>
                          {/* // TODO: URLをコピーする */}
                          <Copy className="mr-2 h-4 w-4" />
                          <span>URLをコピーする</span>
                        </CommandItem>
                        <CommandItem>
                          {/* // TODO: 公開を停止するロジック実装 */}
                          <Lock className="mr-2 h-4 w-4" />
                          <span>公開を停止する</span>
                        </CommandItem>
                        <CommandSeparator />
                        <CommandItem>
                          {/* // TODO: レシピを削除するロジック実装 */}
                          <Trash className="mr-2 h-4 w-4" />
                          <span>削除する</span>
                        </CommandItem>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
          <p className="text-mauve12">{description}</p>
        </div>
        <div className="flex gap-x-4">
          <ProfileLink id={user.id} imagePath={"https://github.com/shadcn.png"} name={user.name} />
          <NumberUnit numbers={100000000} unit={CONSTANTS.FAVORITE} />
        </div>
        <ToggleButton
          isActive={false}
          activeLabel={BUTTON_NAMES.IS_FAVORITE}
          inactiveLabel={BUTTON_NAMES.UN_FAVORITE}
          formAction={undefined}
        />
      </div>
    </>
  );
};

export default RecipeHero;
