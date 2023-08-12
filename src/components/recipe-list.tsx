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
  }[];
  segment: string;
};

const RecipeList = ({ recipes, segment }: Props) => {
  return (
    <>
      {recipes.map(({ id, _count, description, title, isPublished }) => (
        <li key={id} className="flex flex-col">
          <RecipeCard
            path={`/${segment}/${id}`}
            favorites={_count.likes}
            description={description}
            isPublished={isPublished}
            imageUrl="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
            title={title}
          />
        </li>
      ))}
    </>
  );
};

export default RecipeList;
