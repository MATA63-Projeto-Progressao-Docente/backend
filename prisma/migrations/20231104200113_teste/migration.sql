/*
  Warnings:

  - You are about to drop the column `documentId` on the `SubmittedDocument` table. All the data in the column will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityId` to the `SubmittedDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processId` to the `SubmittedDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPoints` to the `SubmittedDocument` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "SubmittedDocument" DROP CONSTRAINT "SubmittedDocument_documentId_fkey";

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubmittedDocument" DROP COLUMN "documentId",
ADD COLUMN     "activityId" INTEGER NOT NULL,
ADD COLUMN     "processId" INTEGER NOT NULL,
ADD COLUMN     "totalPoints" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_fieldId_number_key" ON "Activity"("fieldId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_userId_key" ON "Professor"("userId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedDocument" ADD CONSTRAINT "SubmittedDocument_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmittedDocument" ADD CONSTRAINT "SubmittedDocument_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
