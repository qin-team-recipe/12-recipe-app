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
          <ChefTile
            chefName={name}
            bio={profile}
            id={id}
            // TODO: 画像の設定
            imageUrl="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
            recipeCount={_count.Recipe}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChefTileList;
