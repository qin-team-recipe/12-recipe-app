import { Separator } from "@/src/components/ui/separator";

export const metadata = {
  title: "検索",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Separator className="hidden h-full w-[1px] md:block" />
      <main className="w-full flex-1 overflow-y-auto pb-20 md:pb-8">{children}</main>
      <Separator className="hidden h-full w-[1px] md:block" />
    </>
  );
};

export default layout;
