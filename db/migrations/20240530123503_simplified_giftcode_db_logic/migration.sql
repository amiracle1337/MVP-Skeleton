/*
  Warnings:

  - You are about to drop the `UserSentInvite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSentInvite" DROP CONSTRAINT "UserSentInvite_giftCodeId_fkey";

-- AlterTable
ALTER TABLE "SignupInvite" ADD COLUMN     "giftCodeId" TEXT;

-- DropTable
DROP TABLE "UserSentInvite";

-- AddForeignKey
ALTER TABLE "SignupInvite" ADD CONSTRAINT "SignupInvite_giftCodeId_fkey" FOREIGN KEY ("giftCodeId") REFERENCES "InviteGiftCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;
