import { ChefTile } from "./chef-tile";

type Props = {
  chefs: {
    id: string;
    name: string;
    profile: string | null;
    profileImage: string | null;
    _count: {
      Recipe: number;
    };
  }[];
  totalChefs?: number;
};

const ChefTileList = async ({ chefs }: Props) => {
  return (
    <ul className="px-4">
      {chefs.map(({ id, name, profileImage, profile, _count }) => (
        <li key={id} className="mt-2">
          <ChefTile chefName={name} bio={profile} id={id} imageUrl={profileImage} recipeCount={_count.Recipe} />
        </li>
      ))}
    </ul>
  );
};

export default ChefTileList;
