/*
  Warnings:

  - You are about to drop the column `date` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Request` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTime` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramThreadId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "date",
DROP COLUMN "startTime",
ADD COLUMN     "cardId" BIGINT NOT NULL,
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "telegramThreadId" BIGINT NOT NULL,
ALTER COLUMN "expectedEndTime" SET DATA TYPE TEXT,
ALTER COLUMN "meetingTime" SET DATA TYPE TEXT;
