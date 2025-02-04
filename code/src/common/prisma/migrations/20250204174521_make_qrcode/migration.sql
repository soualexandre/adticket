-- CreateTable
CREATE TABLE "qr_codes" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "linkHash" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "status" "LinkStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qr_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qr_codes_linkHash_key" ON "qr_codes"("linkHash");

-- AddForeignKey
ALTER TABLE "qr_codes" ADD CONSTRAINT "qr_codes_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
