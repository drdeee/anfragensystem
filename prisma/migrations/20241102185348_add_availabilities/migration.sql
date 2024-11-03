-- CreateEnum
CREATE TYPE "AvailabilityType" AS ENUM ('Available', 'Unavailable', 'Unsure', 'CanDrive');

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "firstName" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "requestId" TEXT NOT NULL,
    "type" "AvailabilityType" NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
