import { getRecipeById } from "@/src/actions/getRecipeById";
import DetailAbstract from "@/src/components/detail-abstract";
import DetailHeaderImage from "@/src/components/detail-header-image";
import NumberUnit from "@/src/components/number-unit";
import ProfileLink from "@/src/components/profile-link";
import ToggleButton from "@/src/components/toggle-button";
import { BUTTON_NAMES } from "@/src/constants/button-names";
import { CONSTANTS } from "@/src/constants/constants";

const RecipeHero = async ({ id }: { id: string }) => {
  const { title, description, user } = await getRecipeById(id);

  return (
    <>
      <DetailHeaderImage
        imageUrl={
          "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=667&q=80"
        }
        path={"/mock/tsuboi"}
      />
      <div className="grid gap-4 p-4">
        <DetailAbstract name={title} abstract={description} />
        <div className="flex gap-x-4">
          <ProfileLink id={user.id} avatar={"https://github.com/shadcn.png"} name={user.name} />
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
