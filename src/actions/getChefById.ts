import { prisma } from "../lib/prisma";

const getChefById = async (id: string) => {
  const chef = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Recipe: true,
      followers: true,
      ChefLink: true,
    },
  });

  return chef;
};

export default getChefById;
