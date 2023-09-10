import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const main = async () => {
  // ダミーデータ用の値なので、ここのidはレシピ関係のuser_idを満たすためだけに必要なもの
  // なので、厳密なauthenticationに必要なダミーは用意しない(SupabaseやGithubで認証が必要になるのでシードデータだと対応できない)
  const dummyUserId = uuidv4();
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
        create: {
          recipeImage:
            "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fCVFMyU4MyU5MSVFMyU4MiVCOSVFMyU4MiVCRnxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop",
        },
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
