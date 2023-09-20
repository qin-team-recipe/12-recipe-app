import { getRecipeById } from "@/src/actions/getRecipeById";
import { sortSiteLinks } from "@/src/lib/utils";
import { CircleEllipsis } from "lucide-react";

import LinkToIconRenderer from "@/src/components/link-to-icon-renderer";
import LinkableTabs from "@/src/components/linkable-tabs";
import RouterBackButton from "@/src/components/router-back-button";
import { Command, CommandItem, CommandList } from "@/src/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

import PopoverMenu from "./_components/popover-menu";
import { tabs } from "./_constants/tabs";

export default async function layout({
  params,
  children,
}: {
  params: { recipeId: string; id: string };
  children: React.ReactNode;
}) {
  const { title, description, RecipeLink: recipeLinks } = await getRecipeById(params?.recipeId);

  const sortedRecipeLinks = sortSiteLinks(recipeLinks.map((recipeLink) => recipeLink.linkUrl));

  const visibleLinks = sortedRecipeLinks.slice(0, 2);
  const moreLinks = sortedRecipeLinks.slice(2);

  return (
    <>
      <div className="cursor-pointer stroke-white pl-4 pt-4 hover:stroke-mauve2">
        <RouterBackButton
          path={`/admin/${params.id}`}
          size={32}
          className="rounded-full bg-[#040013]/[.48] text-mauve1"
        />
      </div>
      <div className="grid gap-4 p-4">
        <div className="grid gap-4">
          <div className="flex justify-between">
            <h6 className="text-xl font-bold text-mauve12">{title}</h6>
            <div className="ml-3 flex items-center gap-3">
              {visibleLinks && <LinkToIconRenderer links={visibleLinks.map((link) => link.url)} />}
              {moreLinks.length > 0 && (
                <Popover>
                  <PopoverTrigger>
                    <CircleEllipsis size={20} />
                  </PopoverTrigger>
                  <PopoverContent align="end" className="p-2">
                    <Command className="w-full">
                      <CommandList>
                        {moreLinks.map((link, index) => (
                          <CommandItem key={index}>
                            <LinkToIconRenderer links={[link.url]} />
                            <span className="ml-2 text-lg">{link.label}</span>
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}

              {<PopoverMenu chefId={params.id} recipeId={params.recipeId} />}
            </div>
          </div>
          <p className="text-mauve12">{description}</p>
        </div>
      </div>
      <LinkableTabs tabs={tabs({ chefId: params.id, recipeId: params.recipeId })}>{children}</LinkableTabs>
    </>
  );
}
