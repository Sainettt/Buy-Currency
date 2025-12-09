-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankCard" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 10000.0,
    "cvv" TEXT NOT NULL,
    "expiry" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "BankCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_currency_key" ON "Wallet"("userId", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "BankCard_userId_key" ON "BankCard"("userId");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankCard" ADD CONSTRAINT "BankCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
