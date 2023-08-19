import BottomNavbar from "@/src/components/layout/bottom-navbar";
import SideNavbar from "@/src/components/layout/side-navbar";
import { Separator } from "@/src/components/ui/separator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavbar />
      <main className="block h-auto min-h-screen items-center pb-24 md:w-[800px] md:max-w-[800px] md:border-x-[1px] md:border-x-border md:pb-8">
        {children}
      </main>
      <BottomNavbar />
    </>
  );
};

export default layout;
