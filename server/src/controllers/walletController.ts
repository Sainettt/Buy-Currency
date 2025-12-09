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
            
            await prisma.$transaction(async (tx) => {

                await tx.bankCard.update({
                    where: { userId },
                    data: { balance: { decrement: amount } }
                });

                await tx.wallet.upsert({
                    where: { userId_currency: { userId, currency: 'USD' } },
                    update: { balance: { increment: amount } },
                    create: { userId, currency: 'USD', balance: amount }
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

            const walletItems = await prisma.wallet.findMany({
                where: { userId }
            });

            if (walletItems.length === 0) {
                return res.json({ totalBalanceUsd: "0.00", assets: [] });
            }

            const cryptoSymbols = walletItems
                .filter(item => item.currency !== 'USD')
                .map(item => `${item.currency}USDT`);

            let prices: Record<string, number> = {};

            if (cryptoSymbols.length > 0) {

                const { data } = await binanceApi.get('/ticker/price');
                
                data.forEach((ticker: any) => {
                    if (cryptoSymbols.includes(ticker.symbol)) {
                        prices[ticker.symbol] = parseFloat(ticker.price);
                    }
                });
            }

            let totalBalanceUsd = 0;

            const detailedPortfolio = walletItems.map(item => {
                let valueInUsd = 0;
                let currentPrice = 0;

                if (item.currency === 'USD') {
                    valueInUsd = item.balance;
                    currentPrice = 1;
                } else {
                    const tickerName = `${item.currency}USDT`;
                    currentPrice = prices[tickerName] || 0;
                    valueInUsd = item.balance * currentPrice;
                }

                totalBalanceUsd += valueInUsd;

                return {
                    id: item.id,
                    currency: item.currency, 
                    balance: item.balance,   
                    price: currentPrice,    
                    valueUsd: valueInUsd.toFixed(2)
                };
            });

            return res.json({
                totalBalanceUsd: totalBalanceUsd.toFixed(2),
                assets: detailedPortfolio
            });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Error fetching portfolio' });
        }
    }
}

export default new WalletController();