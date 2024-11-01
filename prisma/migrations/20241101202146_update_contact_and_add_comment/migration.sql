/*
  Warnings:

  - You are about to drop the column `contactAdditionalType` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `contactAdditionalValue` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "contactAdditionalType",
DROP COLUMN "contactAdditionalValue",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "contactMail" TEXT,
ADD COLUMN     "contactTelegram" TEXT;
