-- CreateTable
CREATE TABLE "ChefLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chef_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ChefLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChefLink" ADD CONSTRAINT "ChefLink_chef_id_fkey" FOREIGN KEY ("chef_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
