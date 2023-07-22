import BottomNavbar from "@/src/components/layout/bottom-navbar";
import SideNavbar from "@/src/components/layout/side-navbar";
import { Separator } from "@/src/components/ui/separator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavbar />
      <Separator className="hidden h-full w-[1px] md:block" />
      <main className="mb-20 flex-1 overflow-y-auto md:mb-0">{children}</main>
      <Separator className="hidden h-full w-[1px] md:block" />
      <BottomNavbar />
    </>
  );
};

export default layout;
