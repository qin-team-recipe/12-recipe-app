import { favoriteRecipe, unFavoriteRecipe } from "@/src/actions/actionsForFavoriteRecipe";
import ToggleButton from "@/src/components/toggle-button";

type Props = {
  isActive: boolean;
  recipeId: string;
};

const FavoriteButton = ({ isActive, recipeId }: Props) => {
  return (
    <ToggleButton
      className="w-full"
      isActive={isActive}
      activeLabel={"お気に入りに追加済"}
      inactiveLabel={"お気に入りに追加"}
      onClick={() => {
        isActive ? unFavoriteRecipe(recipeId) : favoriteRecipe(recipeId);
      }}
    />
  );
};

export default FavoriteButton;
