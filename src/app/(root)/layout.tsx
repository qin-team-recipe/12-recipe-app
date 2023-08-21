import BottomNavbar from "@/src/components/layout/bottom-navbar";
import SideNavbar from "@/src/components/layout/side-navbar";
import { Separator } from "@/src/components/ui/separator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavbar />
      <main className="flex-1 overflow-y-auto pb-24 md:max-w-[800px] md:border-x-[1px] md:border-x-border md:pb-8">
        {children}
      </main>
      <BottomNavbar />
    </>
  );
};

export default layout;
