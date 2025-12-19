import cron from 'node-cron';
import binanceApi from './binanceApi';

interface TickerData {
    price: number;
    changePercent: number;
}

export let priceCache: Record<string, TickerData> = {};

export const startPriceUpdater = () => {
    console.log('🚀 Price updater service started');

    cron.schedule('*/5 * * * * *', async () => {
        try {
            const { data } = await binanceApi.get('/ticker/24hr');
            
            data.forEach((ticker: any) => {
                priceCache[ticker.symbol] = {
                    price: parseFloat(ticker.lastPrice),
                    changePercent: parseFloat(ticker.priceChangePercent)
                };
            });

            console.log(`[Cron] Updated market data for ${data.length} pairs`);
        } catch (error) {
            console.error('[Cron] Error updating prices:', error);
        }
    });
};

export const getTickerFromCache = (symbol: string): TickerData => {
    return priceCache[symbol] || { price: 0, changePercent: 0 };
};