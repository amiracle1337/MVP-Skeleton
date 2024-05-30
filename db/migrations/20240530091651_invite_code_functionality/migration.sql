-- CreateTable
CREATE TABLE "InviteGiftCode" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "redeemed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InviteGiftCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSentInvite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "giftCodeId" TEXT NOT NULL,

    CONSTRAINT "UserSentInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InviteGiftCode" ADD CONSTRAINT "InviteGiftCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSentInvite" ADD CONSTRAINT "UserSentInvite_giftCodeId_fkey" FOREIGN KEY ("giftCodeId") REFERENCES "InviteGiftCode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
