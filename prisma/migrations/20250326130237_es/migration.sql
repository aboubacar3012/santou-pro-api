/*
  Warnings:

  - You are about to drop the column `isActive` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Enterprise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Enterprise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Enterprise" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_email_key" ON "Enterprise"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_phone_key" ON "Enterprise"("phone");
