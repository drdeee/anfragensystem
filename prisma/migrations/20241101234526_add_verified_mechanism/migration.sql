-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "contactVerified" TIMESTAMP(3),
ALTER COLUMN "cardId" DROP NOT NULL,
ALTER COLUMN "telegramThreadId" DROP NOT NULL;
