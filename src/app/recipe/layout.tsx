import { Separator } from "@/src/components/ui/separator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Separator className="hidden h-full w-[1px] md:block" />
      <main className="w-full flex-1 overflow-y-auto pb-20">{children}</main>
      <Separator className="hidden h-full w-[1px] md:block" />
    </>
  );
};

export default layout;
