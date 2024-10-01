/*
  Warnings:

  - Added the required column `contactAdditionalType` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactAdditionalValue` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPhone` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventOrganizer` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTopic` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedEndTime` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedPeople` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isStationary` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLocation` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "contactAdditionalType" TEXT NOT NULL,
ADD COLUMN     "contactAdditionalValue" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactPhone" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "eventOrganizer" TEXT NOT NULL,
ADD COLUMN     "eventTopic" TEXT NOT NULL,
ADD COLUMN     "eventType" TEXT NOT NULL,
ADD COLUMN     "expectedEndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "expectedPeople" INTEGER NOT NULL,
ADD COLUMN     "isStationary" BOOLEAN NOT NULL,
ADD COLUMN     "meetingLocation" TEXT,
ADD COLUMN     "meetingTime" TIMESTAMP(3),
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "startLocation" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
