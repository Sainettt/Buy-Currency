import React, { useState, useCallback, useRef } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomBar from '../../components/BottomBar';
import { appStyles } from '../../styles/appStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../src/navigation/appTypes';
import UpperText from '../../components/UpperText';
import CurrencyItem from '../../components/CurrencyItem';
import { currencyAPI } from '../../services/api';
import { Currency } from '../../src/types/types';
type AllCurrenciesProps = NativeStackScreenProps<
  AppStackParamList,
  'AllCurrencies'
>;

const AllCurrenciesScreen: React.FC<AllCurrenciesProps> = ({ navigation }) => {
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(false);
  const isLoaded = useRef(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchAllCurrencies = async () => {
        if (!isLoaded.current) {
          setLoading(true);
        }
        try {
          const data = await currencyAPI.getTopCryptos(100);
          setAllCurrencies(data);
          isLoaded.current = true;
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };
      fetchAllCurrencies();

      const intervalId = setInterval(fetchAllCurrencies, 10000);

      return () => {
        isActive = false;
        clearInterval(intervalId);
      };
    }, []),
  );

  return (
    <View style={appStyles.flexContainer}>
      <View style={appStyles.containerWithoutPadding}>
        <UpperText
          title="All Currencies"
          onPress={() => navigation.goBack()}
        />
        {loading && allCurrencies.length === 0 ? (
          <View style={appStyles.indicatorStyle}>
            <ActivityIndicator size="large" color="#83EDA6" />
          </View>
        ) : (
          <FlatList
            data={allCurrencies}
            renderItem={({ item }) => <CurrencyItem item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            windowSize={5}
            ListEmptyComponent={
              <Text style={appStyles.emptyListText}>Loading data...</Text>
            }
          />
        )}
      </View>
      <BottomBar
        homePress={() => navigation.navigate('Main')}
        walletPress={() => {}}
        transactionPress={() => {}}
      />
    </View>
  );
};
export default AllCurrenciesScreen;
