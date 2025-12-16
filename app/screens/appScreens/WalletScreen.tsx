import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
// Правильный импорт для замены deprecated компонента
import { SafeAreaView } from 'react-native-safe-area-context';
import { appStyles } from '../../styles/appStyles';

// Импорт компонентов
import BottomBar from '../../components/BottomBar';
import UpperText from '../../components/UpperText';
import WalletHeader from '../../components/WalletHeader';
import WalletAssetItem from '../../components/WalletAssetItem';

// Тип данных (лучше вынести в types.ts)
type Asset = {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  change: number;
};

const assetsData: Asset[] = [
  { id: '1', symbol: 'ETH', name: 'Ethereum', amount: 150, value: 3201.71, change: 2.4 },
  { id: '2', symbol: 'USD', name: 'US Dollar', amount: 200, value: 3.81, change: 0 }, 
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
  { id: '3', symbol: 'GBP', name: 'British Pound', amount: 100, value: 4.85, change: -0.5 },
];

const WalletScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const handleTopUp = () => {
    console.log('Top Up pressed');
    // navigation.navigate('BalanceTopUpScreen');
  };

  const handleAssetPress = (item: Asset) => {
    console.log('Pressed asset:', item.symbol);
  };

  return (
    // edges={['top']} оставляет отступ только сверху, так как BottomBar и так внизу
    <SafeAreaView style={appStyles.containerWithoutPadding} edges={['top', 'left', 'right']}>
      
      <UpperText title="Wallet" onPress={() => navigation.goBack()}/>

      {/* Список занимает все свободное место (flex: 1) */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={assetsData}
          keyExtractor={(item) => item.id}
          // Рендерим элемент через наш новый компонент
          renderItem={({ item }) => (
            <WalletAssetItem item={item} onPress={handleAssetPress} />
          )}
          // Рендерим шапку через наш новый компонент
          ListHeaderComponent={
            <WalletHeader 
              balance="500,23" 
              loading={loading} 
              onTopUpPress={handleTopUp} 
            />
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Нижний бар прижат к низу */}
      <View>
        <BottomBar homePress={() => navigation.navigate("Main")} walletPress={() => navigation.navigate("Wallet")} transactionPress={() => {}} /> 
      </View>

    </SafeAreaView>
  );
};

export default WalletScreen;