import { ChefCard } from "@/src/components/chef-card";
import { Button } from "@/src/components/ui/button";

const page = () => {
  return (
    <div>
      <Button>Search</Button>
      <ChefCard
        routingUrl="/"
        imageUrl="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        imageText="山田シェフ"
      />
    </div>
  );
};

export default page;
