import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ダミーデータ用の値なので、ここのidはレシピ関係のuser_idを満たすためだけに必要なもの
  // なので、厳密なauthenticationに必要なダミーは用意しない(SupabaseやGithubで認証が必要になるのでシードデータだと対応できない)
  const dummyUserId = "1";
  const dummyUser = prisma.user.create({
    data: {
      id: dummyUserId,
      name: "chef",
      role: "CHEF",
    },
  });

  const dummyRecipe = prisma.recipe.create({
    data: {
      title: "パスタ",
      description: "オリジナルスペシャルパスタのレシピ",
      userId: dummyUserId,
      servingCount: 1,
      isPublished: true,
      Ingredient: {
        createMany: { data: [{ title: "麺" }, { title: "トマト" }, { title: "オリーブオイル" }] },
      },
      Instruction: {
        createMany: {
          data: [
            {
              stepOrder: 1,
              stepDescription:
                '{"blocks":[{"key":"em51s","text":"麺を茹でる","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            },
            {
              stepOrder: 2,
              stepDescription:
                '{"blocks":[{"key":"em51s","text":"トマトを煮込む","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
            },
          ],
        },
      },
      RecipeImage: {
        create: { recipeImage: "" },
      },
    },
  });

  await prisma.$transaction([dummyUser, dummyRecipe]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
