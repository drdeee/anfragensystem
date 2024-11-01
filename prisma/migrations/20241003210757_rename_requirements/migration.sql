/*
  Warnings:

  - You are about to drop the column `requirements` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "requirements",
ADD COLUMN     "programPoints" TEXT[];
