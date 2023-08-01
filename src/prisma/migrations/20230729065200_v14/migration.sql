-- CreateTable
CREATE TABLE "DraftRecipe" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "user_id" TEXT NOT NULL,
    "serving_count" INTEGER,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DraftRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftRecipeImage" (
    "id" TEXT NOT NULL,
    "draft_recipe_id" TEXT NOT NULL,
    "recipe_image" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DraftRecipeImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftInstruction" (
    "id" SERIAL NOT NULL,
    "draft_recipe_id" TEXT NOT NULL,
    "step_order" INTEGER NOT NULL,
    "step_description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DraftInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftIngredient" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "draft_recipe_id" TEXT NOT NULL,
    "is_custom" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DraftIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftRecipeLink" (
    "id" TEXT NOT NULL,
    "draft_recipe_id" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DraftRecipeLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DraftInstruction_draft_recipe_id_step_order_key" ON "DraftInstruction"("draft_recipe_id", "step_order");

-- AddForeignKey
ALTER TABLE "DraftRecipe" ADD CONSTRAINT "DraftRecipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftRecipeImage" ADD CONSTRAINT "DraftRecipeImage_draft_recipe_id_fkey" FOREIGN KEY ("draft_recipe_id") REFERENCES "DraftRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftInstruction" ADD CONSTRAINT "DraftInstruction_draft_recipe_id_fkey" FOREIGN KEY ("draft_recipe_id") REFERENCES "DraftRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftIngredient" ADD CONSTRAINT "DraftIngredient_draft_recipe_id_fkey" FOREIGN KEY ("draft_recipe_id") REFERENCES "DraftRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftRecipeLink" ADD CONSTRAINT "DraftRecipeLink_draft_recipe_id_fkey" FOREIGN KEY ("draft_recipe_id") REFERENCES "DraftRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
