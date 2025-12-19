import { Request, Response } from 'express';
import prisma from '../prisma';
import { getTickerFromCache } from './services/priceCache';
class WalletController {

    async topUpWallet(req: Request, res: Response): Promise<any> {
        try {
            const { userId, amount } = req.body;
            const card = await prisma.bankCard.findUnique({ where: { userId } });
            
            if (!card || card.balance < amount) {
                return res.status(400).json({ message: 'Error with bank card or insufficient funds' });
            }
            
            const wallet = await prisma.wallet.findUnique({ where: { userId } });
            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }

            await prisma.$transaction(async (tx) => {
                await tx.bankCard.update({ where: { userId }, data: { balance: { decrement: amount } } });
                await tx.wallet.update({ where: { id: wallet.id }, data: { balanceUsd: { increment: amount } } });
                await tx.transaction.create({
                    data: { walletId: wallet.id, type: 'DEPOSIT', currency: 'USD', amount, price: 1.0, totalUsd: amount }
                });
            });

            return res.json({ message: 'Top up successful' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Transaction failed' });
        }
    }

    async getPortfolio(req: Request, res: Response): Promise<any> {
        try {
            const userId = parseInt(req.params.userId);

            const wallet = await prisma.wallet.findUnique({
                where: { userId },
                include: { assets: true }
            });

            if (!wallet) {
                return res.json({ totalBalanceUsd: "0.00", assets: [], totalChange24h: 0, totalChangePercent: 0 });
            }

            let totalBalanceUsd = wallet.balanceUsd; 
            let totalPreviousDayBalance = wallet.balanceUsd; 

            // Here we take data from the cache 
            const detailedAssets = wallet.assets.map(asset => {
                let currentPrice = 1;
                let changePercent = 0;

                if (asset.currency !== 'USD') {
                    const tickerName = `${asset.currency}USDT`;
                    const tickerData = getTickerFromCache(tickerName);
                    
                    currentPrice = tickerData.price;
                    changePercent = tickerData.changePercent;
                }

                const currentValue = asset.balance * currentPrice;
                
                let previousValue = currentValue;
                if (changePercent !== 0) {
                    previousValue = currentValue / (1 + (changePercent / 100));
                }

                const changeValue = currentValue - previousValue;

                if (asset.currency !== 'USD') {
                    totalBalanceUsd += currentValue;
                    totalPreviousDayBalance += previousValue;
                }

                return {
                    id: asset.id.toString(),
                    symbol: asset.currency,
                    name: asset.currency,
                    amount: asset.balance,
                    price: currentPrice,
                    value: currentValue,
                    change: changePercent,
                    changeValue: changeValue 
                };
            });

            if (wallet.balanceUsd > 0) {
                 const hasUsd = detailedAssets.some(a => a.symbol === 'USD');
                 if(!hasUsd) {
                    detailedAssets.unshift({
                        id: 'usd-main',
                        symbol: 'USD',
                        name: 'US Dollar',
                        amount: wallet.balanceUsd,
                        price: 1,
                        value: wallet.balanceUsd,
                        change: 0,
                        changeValue: 0
                    });
                 }
            }

            const totalChangeValue = totalBalanceUsd - totalPreviousDayBalance;
            
            let totalChangePercent = 0;
            if (totalPreviousDayBalance !== 0) {
                totalChangePercent = (totalChangeValue / totalPreviousDayBalance) * 100;
            }

            detailedAssets.sort((a, b) => b.value - a.value);

            return res.json({
                totalBalanceUsd: totalBalanceUsd.toFixed(2),
                totalChangeValue: totalChangeValue.toFixed(2),
                totalChangePercent: totalChangePercent.toFixed(2),
                assets: detailedAssets
            });

        } catch (e) {
            console.error('Error fetching portfolio:', e);
            return res.status(500).json({ message: 'Error fetching portfolio' });
        }
    }

    async getTransactions(req: Request, res: Response): Promise<any> {
        try {
            const userId = parseInt(req.params.userId);

            const wallet = await prisma.wallet.findUnique({
                where: { userId },
            });

            if (!wallet) {
                return res.status(404).json({ message: 'Wallet not found' });
            }

            const transactions = await prisma.transaction.findMany({
                where: { walletId: wallet.id },
                orderBy: { createdAt: 'desc' }
            });

            return res.json(transactions);
        } catch (e) {
            console.error('Error fetching transactions:', e);
            return res.status(500).json({ message: 'Error fetching transactions' });
        }
    }
    async withdraw(req: Request, res: Response): Promise<any> {
        try {
            const { userId, amount } = req.body;

            const wallet = await prisma.wallet.findUnique({ where: { userId } });
            if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

            if (wallet.balanceUsd < amount) {
                return res.status(400).json({ message: 'Insufficient USD balance' });
            }

            const card = await prisma.bankCard.findUnique({ where: { userId } });
            if (!card) return res.status(404).json({ message: 'Bank card not found' });

            await prisma.$transaction(async (tx) => {

                await tx.wallet.update({
                    where: { id: wallet.id },
                    data: { balanceUsd: { decrement: amount } }
                });

                await tx.bankCard.update({
                    where: { userId },
                    data: { balance: { increment: amount } }
                });

                await tx.transaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'WITHDRAWAL',
                        currency: 'USD',
                        amount: amount,
                        price: 1.0,
                        totalUsd: amount
                    }
                });
            });

            return res.json({ message: 'Withdrawal successful' });

        } catch (e) {
            console.error('Withdraw error:', e);
            return res.status(500).json({ message: 'Withdrawal failed' });
        }
    }
}

export default new WalletController();