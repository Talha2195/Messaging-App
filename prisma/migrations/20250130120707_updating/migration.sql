/*
  Warnings:

  - You are about to drop the column `userId` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_userId_fkey";

-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "userId",
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
