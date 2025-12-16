import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TradeController {

    // === BUY ===
    // User gives USD -> Receives Crypto (Asset)
    async buy(req: Request, res: Response): Promise<any> {
        try {
            const { userId, currency, amount, currentPrice } = req.body;
            const totalCostUsd = amount * currentPrice;

            const wallet = await prisma.wallet.findUnique({
                where: { userId: Number(userId) }
            });

            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }

            if (wallet.balanceUsd < totalCostUsd) {
                return res.status(400).json({ message: 'Insufficient USD balance' });
            }

            await prisma.$transaction(async (tx) => {
                
                await tx.wallet.update({
                    where: { id: wallet.id },
                    data: { balanceUsd: { decrement: totalCostUsd } }
                });

                await tx.asset.upsert({
                    where: {
                        walletId_currency: { walletId: wallet.id, currency: currency }
                    },
                    update: { balance: { increment: amount } },
                    create: {
                        walletId: wallet.id,
                        currency: currency,
                        balance: amount
                    }
                });

                await tx.transaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'BUY',
                        currency: currency,
                        amount: amount,
                        price: currentPrice,
                        totalUsd: totalCostUsd
                    }
                });
            });

            return res.json({ message: `Successfully bought ${amount} ${currency}` });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Transaction failed' });
        }
    }

    // === SELL ===
    // User gives Crypto (Asset) -> Receives USD
    async sell(req: Request, res: Response): Promise<any> {
        try {
            const { userId, currency, amount, currentPrice } = req.body;
            const totalRevenueUsd = amount * currentPrice;

            const wallet = await prisma.wallet.findUnique({
                where: { userId: Number(userId) }
            });

            if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

            const asset = await prisma.asset.findUnique({
                where: {
                    walletId_currency: { walletId: wallet.id, currency: currency }
                }
            });

            if (!asset || asset.balance < amount) {
                return res.status(400).json({ message: `Insufficient ${currency} balance` });
            }

            await prisma.$transaction(async (tx) => {
                
                await tx.asset.update({
                    where: { id: asset.id },
                    data: { balance: { decrement: amount } }
                });

                await tx.wallet.update({
                    where: { id: wallet.id },
                    data: { balanceUsd: { increment: totalRevenueUsd } }
                });

                await tx.transaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'SELL',
                        currency: currency,
                        amount: amount,
                        price: currentPrice,
                        totalUsd: totalRevenueUsd
                    }
                });
            });

            return res.json({ message: `Successfully sold ${amount} ${currency}` });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Transaction failed' });
        }
    }
}

export default new TradeController();