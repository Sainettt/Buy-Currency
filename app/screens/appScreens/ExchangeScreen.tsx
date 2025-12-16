import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { AppStackParamList } from '../../src/navigation/appTypes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import UpperTextScreen from '../../components/UpperTextScreen';
import BottomBar from '../../components/BottomBar';
import { appStyles } from '../../styles/appStyles';
import { TradePanel } from '../../components/TradePanel';
import { currencyAPI } from '../../services/api';
import { CryptoChart } from '../../components/CryptoChart';
import { IntervalSelector } from '../../components/IntervalSelector';

type ExchangeScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'Exchange'
>;

const screenWidth = Dimensions.get('window').width;

const ExchangeScreen: React.FC<ExchangeScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    coinId,
    symbol,
    currentPrice: initialPrice,
    ownedAmount,
  } = route.params;

  const [selectedInterval, setSelectedInterval] = useState('1D');
  const intervals = ['1H', '1D', '1W', '1M', '1Y'];

  const [chartData, setChartData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [priceChangePercent, setPriceChangePercent] = useState(
    route.params.priceChange,
  );
  const [priceChangeValue, setPriceChangeValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isLoaded = useRef(false);

  useEffect(() => {
    isLoaded.current = false;
  }, [selectedInterval]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchHistory = async () => {

        if (!isLoaded.current) setIsLoading(true);
        try {
          const response = await currencyAPI.getHistory(
            coinId,
            selectedInterval,
          );

          if (isActive) {
            setChartData(response.data);
            setPriceChangePercent(response.changePercent);
            setPriceChangeValue(response.changeValue);

            if (response.data.length > 0) {
              setCurrentPrice(
                response.data[response.data.length - 1].value.toFixed(2),
              );
            }
            isLoaded.current = true;
          }
        } catch (e) {
          console.log('Error fetching history', e);
        } finally {
          if (isActive) setIsLoading(false);
        }
      };
      fetchHistory();
      const intervalId = setInterval(fetchHistory, 5000);

      return () => {
        isActive = false;
        clearInterval(intervalId);
      };
    }, [selectedInterval, coinId]),
  );

  const isPositive = parseFloat(priceChangePercent) >= 0;
  const balanceInUsd = (Number(ownedAmount) * Number(currentPrice)).toFixed(2);

  return (
    <View style={appStyles.flexContainer}>
      <View style={appStyles.containerWithoutPadding}>
        <UpperTextScreen
          title={`${symbol} Exchange`}
          onPress={() => navigation.goBack()}
        />

        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            {/* Цена */}
            <View style={styles.priceContainer}>
              <Text style={styles.totalLabel}>Current Price</Text>
              <Text style={styles.bigPrice}>${currentPrice}</Text>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={[
                    styles.changeText,
                    { color: isPositive ? '#83EDA6' : '#EB5B5B' },
                  ]}
                >
                  {priceChangeValue}$ ({isPositive ? '+' : ''}
                  {priceChangePercent}%)
                </Text>
                <Text style={styles.intervalLabel}> • {selectedInterval}</Text>
              </View>
            </View>

            {/* Баланс */}
            <View style={styles.balanceInfoContainer}>
              <Text style={styles.balanceInfoText}>
                Your Balance:{' '}
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  ${balanceInUsd}
                </Text>
              </Text>
            </View>

            {/* График */}
            <CryptoChart
              data={chartData}
              loading={isLoading}
              isPositive={isPositive}
              width={screenWidth}
            />

            {/* Интервалы */}
            <IntervalSelector
              intervals={intervals}
              selectedInterval={selectedInterval}
              onSelect={setSelectedInterval}
            />
          </View>

          <TradePanel />
        </View>
      </View>

      <BottomBar
        homePress={() => navigation.navigate('Main')}
        walletPress={() => {}}
        transactionPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  totalLabel: {
    color: '#AAAAAA',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  bigPrice: {
    color: '#FFFFFF',
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    marginVertical: 5,
  },
  changeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  intervalLabel: {
    color: '#777',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  balanceInfoContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  balanceInfoText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  chartContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intervalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  intervalButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  activeIntervalButton: {
    backgroundColor: '#3C3C3C',
  },
  intervalText: {
    color: '#777',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  activeIntervalText: {
    color: '#FFFFFF',
  },
});

export default ExchangeScreen;
