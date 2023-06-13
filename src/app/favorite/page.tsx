import { ChefIcon } from "@/src/components/chef-icon";

const page = () => {
  return (
    <div>
      <div>favorite</div>
      <div className="flex">
        {/* map処理をして横スクロールできるようにする */}
        <ChefIcon
          routingUrl="/"
          imageUrl="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          chefName="山田シェフ山田シェフ山田シェフ"
        />
        <ChefIcon
          routingUrl="/"
          imageUrl="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          chefName="山田シェフ山田シェフ山田シェフ"
        />
      </div>
    </div>
  );
};

export default page;
