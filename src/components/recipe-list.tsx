import RecipeCard from "@/src/components/recipe-card";

type Props = {
  recipes: {
    id: string;
    _count: {
      likes: number;
    };
    isPublished: boolean;
    description: string;
    title: string;
    RecipeImage: {
      recipeImage: string;
    }[];
  }[];
  path: string;
};

const RecipeList = ({ recipes, path }: Props) => {
  return (
    <>
      {recipes.map(({ id, _count, description, title, isPublished, RecipeImage }) => {
        return (
          <li key={id} className="flex flex-col">
            <RecipeCard
              path={`/${path}/${id}`}
              favorites={_count.likes}
              description={description}
              isPublished={isPublished}
              title={title}
              imageUrl={RecipeImage[0].recipeImage}
            />
          </li>
        );
      })}
    </>
  );
};

export default RecipeList;
