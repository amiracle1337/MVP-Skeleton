-- CreateEnum
CREATE TYPE "LemonSqueezySubscriptionStatus" AS ENUM ('on_trial', 'active', 'paused', 'past_due', 'unpaid', 'cancelled', 'expired');

-- CreateTable
CREATE TABLE "LemonSqueezyVariant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "variantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributes" JSONB,

    CONSTRAINT "LemonSqueezyVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LemonSqueezyProduct" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "attributes" JSONB,

    CONSTRAINT "LemonSqueezyProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LemonSqueezyPayment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "attributes" JSONB,

    CONSTRAINT "LemonSqueezyPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LemonSqueezySubscription" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriptionId" TEXT,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "attributes" JSONB,
    "status" "LemonSqueezySubscriptionStatus" NOT NULL,

    CONSTRAINT "LemonSqueezySubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LemonSqueezyVariant_variantId_key" ON "LemonSqueezyVariant"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "LemonSqueezyProduct_productId_key" ON "LemonSqueezyProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "LemonSqueezyPayment_paymentId_key" ON "LemonSqueezyPayment"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "LemonSqueezySubscription_subscriptionId_key" ON "LemonSqueezySubscription"("subscriptionId");

-- AddForeignKey
ALTER TABLE "LemonSqueezyVariant" ADD CONSTRAINT "LemonSqueezyVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LemonSqueezyProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezyPayment" ADD CONSTRAINT "LemonSqueezyPayment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "LemonSqueezySubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezySubscription" ADD CONSTRAINT "LemonSqueezySubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezySubscription" ADD CONSTRAINT "LemonSqueezySubscription_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LemonSqueezyProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LemonSqueezySubscription" ADD CONSTRAINT "LemonSqueezySubscription_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "LemonSqueezyVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
