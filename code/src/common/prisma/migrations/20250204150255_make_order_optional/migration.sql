-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_orderId_fkey";

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
