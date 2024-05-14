-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'VERIFY_EMAIL';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "hasLifetimeAccess" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "LemonSquuezyOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "LemonSquuezyOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LemonSquuezyOrder_orderId_key" ON "LemonSquuezyOrder"("orderId");

-- AddForeignKey
ALTER TABLE "LemonSquuezyOrder" ADD CONSTRAINT "LemonSquuezyOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
