/*
  Warnings:

  - Changed the type of `messageId` on the `OverviewMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "OverviewMessage_messageId_key";

-- AlterTable
ALTER TABLE "OverviewMessage" DROP COLUMN "messageId",
ADD COLUMN     "messageId" BIGINT NOT NULL;
