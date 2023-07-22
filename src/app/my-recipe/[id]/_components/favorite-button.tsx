import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/favoriteRecipeActions";
import ToggleButton from "@/src/components/toggle-button";

type Props = {
  isActive: boolean;
  recipeId: string;
};

const FavoriteButton = ({ isActive, recipeId }: Props) => {
  return (
    <form className="flex-1">
      <input type="hidden" name="recipeId" value={recipeId} />
      <ToggleButton
        className="w-full"
        isActive={isActive}
        activeLabel={"お気に入りに追加済"}
        inactiveLabel={"お気に入りに追加"}
        formAction={isActive ? unFavoriteRecipe : favoriteRecipe}
      />
    </form>
  );
};

export default FavoriteButton;
