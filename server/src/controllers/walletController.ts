import { Request, Response } from 'express';
import prisma from '../prisma';
import binanceApi from './services/binanceApi';

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
                
                await tx.bankCard.update({
                    where: { userId },
                    data: { balance: { decrement: amount } }
                });

                await tx.wallet.update({
                    where: { id: wallet.id },
                    data: { balanceUsd: { increment: amount } }
                });

                await tx.transaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'DEPOSIT',
                        currency: 'USD',
                        amount: amount,
                        price: 1.0,        
                        totalUsd: amount
                    }
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
                return res.json({ 
                    totalBalanceUsd: "0.00", 
                    assets: [], 
                    walletUid: null 
                });
            }

            const cryptoSymbols = wallet.assets
                .map(asset => `${asset.currency}USDT`);

            let prices: Record<string, number> = {};

            if (cryptoSymbols.length > 0) {
                try {
                    const { data } = await binanceApi.get('/ticker/price');
                    data.forEach((ticker: any) => {
                        if (cryptoSymbols.includes(ticker.symbol)) {
                            prices[ticker.symbol] = parseFloat(ticker.price);
                        }
                    });
                } catch (binanceError) {
                    console.error("Binance API error:", binanceError);
                }
            }

            let totalBalanceUsd = wallet.balanceUsd; 

            const detailedAssets = wallet.assets.map(asset => {
                const tickerName = `${asset.currency}USDT`;
                const currentPrice = prices[tickerName] || 0;
                const valueInUsd = asset.balance * currentPrice;

                totalBalanceUsd += valueInUsd;

                return {
                    id: asset.id,
                    currency: asset.currency,
                    balance: asset.balance,
                    price: currentPrice,
                    valueUsd: valueInUsd.toFixed(2)
                };
            });

            if (wallet.balanceUsd > 0) {
                detailedAssets.unshift({
                    id: 0,
                    currency: 'USD',
                    balance: wallet.balanceUsd,
                    price: 1,
                    valueUsd: wallet.balanceUsd.toFixed(2)
                });
            }

            return res.json({
                totalBalanceUsd: totalBalanceUsd.toFixed(2),
                walletUid: wallet.walletUid,
                assets: detailedAssets
            });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error fetching portfolio' });
        }
    }
}

export default new WalletController();