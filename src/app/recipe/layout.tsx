import { Separator } from "@/src/components/ui/separator";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="block h-auto min-h-screen items-center pb-8 md:w-[800px] md:max-w-[800px] md:border-x-[1px] md:border-x-border">
      {children}
    </main>
  );
};

export default layout;
