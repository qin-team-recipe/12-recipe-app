import { getRecipeById } from "@/src/actions/getRecipeById";
import ExternalLinkTile from "@/src/components/external-link-tile";
import LinkableTabs from "@/src/components/linkable-tabs";

import RecipeHero from "../_components/recipe-hero";
import { tabs } from "../_constants/tabs";

const page = async ({ params }: { params: { id: string } }) => {
  const { RecipeLink: links } = await getRecipeById(params.id);

  return (
    <div className="mb-20">
      <RecipeHero id={params.id} />
      <LinkableTabs tabs={tabs(params.id)}>
        <div className="flex flex-col">
          {links.length ? (
            links.map(({ id, linkUrl }) => <ExternalLinkTile key={id} siteName={"ツイッター"} siteUrl={linkUrl} />)
          ) : (
            <div className="flex flex-col items-center justify-center pt-4">
              <img
                className="mx-auto mb-4 h-80 w-80"
                src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/61bf07d2cce98fb122df3dd3_1.png"
                alt="No result"
              />
              <p className="font-bold text-mauve12">このレシピにはまだリンクが登録されていません。</p>
            </div>
          )}
        </div>
      </LinkableTabs>
    </div>
  );
};

export default page;
