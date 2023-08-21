import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/src/actions/getAuthenticatedUser";

import { Separator } from "@/src/components/ui/separator";

export const metadata = {
  title: "管理画面",
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="block h-auto min-h-screen items-center md:w-[800px] md:max-w-[800px] md:border-x-[1px] md:border-x-border">
      {children}
    </main>
  );
};

export default layout;
