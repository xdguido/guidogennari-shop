/*
  Warnings:

  - You are about to drop the column `imageSrc` on the `Product` table. All the data in the column will be lost.
  - The `stock` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imageSrc",
ADD COLUMN     "media" TEXT[],
ADD COLUMN     "thumbnail" TEXT,
DROP COLUMN "stock",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
