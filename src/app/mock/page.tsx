import { prisma } from "@/src/lib/prisma";

const Home = async () => {
  const prismaUsers = await prisma.user.findMany();

  console.log(prismaUsers);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {JSON.stringify(prismaUsers, null, 2)}
      </div>
    </main>
  );
};

export default Home;
