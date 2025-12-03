import { Request, Response } from 'express';
import axios from 'axios';
import binanceApi from './services/binanceApi';

class CurrencyController {
    async getPopularCurrencies(req: Request, res: Response): Promise<any> {
        try {
            // 1. Получаем все тикеры с Binance за один запрос
            const response = await binanceApi.get('/ticker/24hr')
            const allTickers = response.data;

            // 2. Находим курс доллара к злотому (USDT/PLN)
            // На Binance пара называется USDTPLN (За 1 USDT дают ~4.x PLN)
            const usdtPlnTicker = allTickers.find((t: any) => t.symbol === 'USDTPLN');
            
            if (!usdtPlnTicker) {
                return res.status(500).json({ message: 'Курс USDT/PLN не найден' });
            }

            const usdtToPlnRate = parseFloat(usdtPlnTicker.lastPrice);
            const usdtChange = parseFloat(usdtPlnTicker.priceChangePercent);

            // 3. Список валют, которые мы хотим видеть (их тикеры к USDT)
            const watchedPairs: Record<string, { name: string, isInverted: boolean }> = {
                // Сам Доллар (USDT)
                'USDTPLN': { name: 'USD', isInverted: false }, // Особый случай

                // Прямые пары (EUR > USD)
                'EURUSDT': { name: 'EUR', isInverted: false },
                'GBPUSDT': { name: 'GBP', isInverted: false },
                'AUDUSDT': { name: 'AUD', isInverted: false },
                'NZDUSDT': { name: 'NZD', isInverted: false },

                // Обратные пары (USD > Валюты)
                'USDTTRY': { name: 'TRY', isInverted: true }, // Лира
                'USDTBRL': { name: 'BRL', isInverted: true }, // Реал
                'USDTUAH': { name: 'UAH', isInverted: true }, // Гривна
                'USDTMXN': { name: 'MXN', isInverted: true }, // Песо
                'USDTZAR': { name: 'ZAR', isInverted: true }, // Рэнд
            };

            const popularCurrencies = [];

            // Добавляем сам Доллар (USD) первым, так как мы его уже нашли
            popularCurrencies.push({
                id: 'USDTPLN',
                symbol: 'USDTPLN',
                name: 'USD',
                price: usdtToPlnRate.toFixed(2),
                change: usdtChange.toFixed(2),
                isFiat: true
            });

            // Обрабатываем остальные валюты
            allTickers.forEach((ticker: any) => {
                const config = watchedPairs[ticker.symbol];
                if (!config || ticker.symbol === 'USDTPLN') return; // Пропускаем лишнее и доллар (уже добавлен)

                let priceInUsd = parseFloat(ticker.lastPrice);
                let change = parseFloat(ticker.priceChangePercent);

                // Если пара обратная (например USDT/TRY = 34), то 1 TRY = 1 / 34 USD
                if (config.isInverted) {
                    priceInUsd = 1 / priceInUsd;
                    change = change * -1; 
                }

                // КОНВЕРТАЦИЯ: Цена в USD * Курс USD/PLN
                const priceInPln = priceInUsd * usdtToPlnRate;

                // Примерный расчет изменения в PLN (сумма % изменения валюты + % изменения доллара к злотому)
                // Это упрощенная формула, но для визуального отображения тренда подходит отлично
                const changeInPln = change + usdtChange;

                popularCurrencies.push({
                    id: ticker.symbol,
                    symbol: ticker.symbol,
                    name: config.name,
                    price: priceInPln.toFixed(2), // Теперь цена в ЗЛОТЫХ
                    change: changeInPln.toFixed(2),
                    isFiat: true
                });
            });

            return res.json(popularCurrencies);

        } catch (e) {
            console.error('Binance API Error:', e);
            return res.status(500).json({ message: 'Error fetching currency data' });
        }
    }
}

export default new CurrencyController();