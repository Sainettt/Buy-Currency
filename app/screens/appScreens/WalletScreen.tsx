import React, { useState, useRef, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, Text } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles/appStyles';

import BottomBar from '../../components/BottomBar';
import UpperText from '../../components/UpperText';
import WalletHeader from '../../components/WalletHeader';
import WalletAssetItem from '../../components/WalletAssetItem';
import { AuthContext } from '../../context/AuthContext';

import { walletAPI } from '../../services/api';

type Asset = {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  price: number;
  change: number;
};

const WalletScreen = ({ navigation }: any) => {
  const { userId } = useContext(AuthContext);
  const [totalBalance, setTotalBalance] = useState('0.00');
  const [portfolioAssets, setPortfolioAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [portfolioStats, setPortfolioStats] = useState({
    val: '0.00',
    pct: '0.00',
  });
  const isLoaded = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchWalletData = async () => {
        if (!userId) return;
        if (!isLoaded.current) setLoading(true);

        try {
          const data = await walletAPI.getPortfolio(Number(userId));

          if (isActive) {
            setTotalBalance(data.totalBalanceUsd);
            setPortfolioAssets(data.assets);
            setPortfolioStats({
              val: data.totalChangeValue,
              pct: data.totalChangePercent,
            });
            isLoaded.current = true;
          }
        } catch (e) {
          console.log('Error fetching wallet:', e);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchWalletData();
      const intervalId = setInterval(fetchWalletData, 5000);

      return () => {
        isActive = false;
        clearInterval(intervalId);
      };
    }, [userId]),
  );

  const handleAssetPress = (item: Asset) => {
    if (item.symbol === 'USD') return;
    const tradingPairId = `${item.symbol}USDT`;

    navigation.navigate('Exchange', {
      coinId: tradingPairId,
      symbol: item.symbol,
      name: item.name,
      currentPrice: item.price,
      priceChange: item.change,
      ownedAmount: item.amount,
    });
  };

  return (
    <SafeAreaView
      style={appStyles.containerWithoutPadding}
      edges={['top', 'left', 'right']}
    >
      <UpperText title="Wallet" onPress={() => navigation.goBack()} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={portfolioAssets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <WalletAssetItem
              item={item}
              onPress={() => handleAssetPress(item)}
            />
          )}
          ListHeaderComponent={
            <WalletHeader
              balance={`${totalBalance}`}
              changeValue={portfolioStats.val}
              changePercent={portfolioStats.pct}
              loading={loading && !isLoaded.current}
              onTopUpPress={() => navigation.navigate('BalanceTopUp')}
            />
          }
          ListEmptyComponent={
            !loading ? (
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: '#999' }}>No assets found</Text>
              </View>
            ) : null
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View>
        <BottomBar
          homePress={() => navigation.navigate('Main')}
          walletPress={() => {}}
          transactionPress={() => navigation.navigate('TransactionHistory')}
        />
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
