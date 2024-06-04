-- AlterEnum with conditional check
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'VERIFY_EMAIL' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'TokenType')) THEN
        ALTER TYPE "TokenType" ADD VALUE 'VERIFY_EMAIL';
    END IF;
END $$;

-- AlterTable with conditional check if 'emailVerifiedAt' column exists
DO $$
BEGIN
    -- Check if the column 'emailVerifiedAt' does not exist in the 'User' table
    IF NOT EXISTS (
        SELECT FROM information_schema.columns
        WHERE table_name='User' AND column_name='emailVerifiedAt'
    ) THEN
        -- Add the 'emailVerifiedAt' column to the 'User' table
        ALTER TABLE "User" ADD COLUMN "emailVerifiedAt" TIMESTAMP(3);
    END IF;
END $$;

-- Directly add 'hasLifetimeAccess' column without conditional check
ALTER TABLE "User" ADD COLUMN "hasLifetimeAccess" BOOLEAN NOT NULL DEFAULT false;

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
