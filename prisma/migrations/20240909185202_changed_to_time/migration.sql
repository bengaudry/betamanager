/*
  Warnings:

  - The `creationDate` column on the `issues` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `creationDate` column on the `suggestions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "issues" DROP COLUMN "creationDate",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "suggestions" DROP COLUMN "creationDate",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
