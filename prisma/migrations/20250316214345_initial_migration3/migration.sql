/*
  Warnings:

  - You are about to drop the column `address` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Account` table. All the data in the column will be lost.
  - The `permissions` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Permissions" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_enterpriseId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "address",
DROP COLUMN "company",
DROP COLUMN "logo",
DROP COLUMN "phone",
DROP COLUMN "permissions",
ADD COLUMN     "permissions" "Permissions"[] DEFAULT ARRAY['READ']::"Permissions"[],
ALTER COLUMN "enterpriseId" DROP NOT NULL;

-- DropEnum
DROP TYPE "PossibleAction";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
