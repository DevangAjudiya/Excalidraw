/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "room_slug_key" ON "room"("slug");
