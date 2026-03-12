-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WEEKLY', 'SPECIAL');

-- CreateEnum
CREATE TYPE "EventDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'ACTIVE',
    "type" "EventType" NOT NULL DEFAULT 'SPECIAL',
    "day" "EventDay",
    "thumbnailId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_thumbnailId_key" ON "Event"("thumbnailId");

-- CreateIndex
CREATE INDEX "Event_day_idx" ON "Event"("day");

-- CreateIndex
CREATE UNIQUE INDEX "Event_day_key" ON "Event"("day");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
