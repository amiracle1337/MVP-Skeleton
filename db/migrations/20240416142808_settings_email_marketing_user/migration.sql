-- AlterTable
ALTER TABLE "User" ADD COLUMN     "settingsEmailMarketing" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "settingsEmailMarketingProduct" BOOLEAN NOT NULL DEFAULT true;
