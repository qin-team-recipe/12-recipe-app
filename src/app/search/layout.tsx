import { Separator } from "@/src/components/ui/separator";

export const metadata = {
  title: "検索",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="block h-auto min-h-screen items-center pb-24 md:w-[800px] md:max-w-[800px] md:border-x-[1px] md:border-x-border md:pb-8">
      {children}
    </main>
  );
};

export default layout;
