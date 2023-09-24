import RecipeCard from "@/src/components/recipe-card";

import { getBlurDataURL } from "../lib/images";
import BlurImage from "./blur-image";

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
      {recipes.map(async ({ id, _count, description, title, isPublished, RecipeImage }) => {
        const imageUrl = RecipeImage && RecipeImage.length > 0 ? RecipeImage[0].recipeImage : null;
        return (
          <li key={id} className="flex flex-col">
            <RecipeCard
              path={`/${path}/${id}`}
              favorites={_count.likes}
              description={description}
              isPublished={isPublished}
              title={title}
              imageComponent={
                <BlurImage
                  src={imageUrl || "/images/recipe-placeholder.png"}
                  className="h-auto w-full rounded-2xl object-cover"
                  alt={title}
                  width={160}
                  height={160}
                  placeholder="blur"
                  priority
                  blurDataURL={await getBlurDataURL(imageUrl || "/images/recipe-placeholder.png")}
                />
              }
            />
          </li>
        );
      })}
    </>
  );
};

export default RecipeList;
