-- CreateTable
CREATE TABLE "recipe" (
    "id" SERIAL NOT NULL,
    "cakeType" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT NOT NULL,
    "imageUrl" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

