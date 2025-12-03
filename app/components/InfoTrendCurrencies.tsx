import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { appStyles } from '../styles/appStyles';

// Типизация данных (такая же, как приходит с сервера)
type Currency = {
  id: string;
  name: string;
  price: string;
  change: string;
  symbol: string;
};

type Props = {
  data: Currency[];
};

const InfoTrendCurrencies: React.FC<Props> = ({ data }) => {

    const renderItem = ({ item }: { item: Currency }) => {

        const isPositive = parseFloat(item.change) >= 0;
        
        return (
            <TouchableOpacity style={localStyles.itemRow}>
                <View>
                    <Text style={appStyles.currencyNameAndPriceText}>{item.name}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                     <Text style={appStyles.currencyNameAndPriceText}> {item.price} </Text>
                </View>

                <View style={isPositive ? appStyles.currencyChangePositiveContainer : appStyles.currencyChangeNegativeContainer}>
                    <Text style={appStyles.currencyChangeText}>
                        {parseFloat(item.change) > 0 ? '+' : ''}{item.change}%
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View> 
            <View style={appStyles.infoTrendHeaderContainer}>
                <Text style={appStyles.infoTrendHeaderText}>Trending</Text>
                <Text style={appStyles.infoPriceHeaderText}>Last Price</Text>
                <Text style={appStyles.infoPriceHeaderText}>24h chg%</Text>
            </View>

            <View style={appStyles.trendHeaderContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false} 
                    ListEmptyComponent={
                        <Text style={localStyles.emptyListText}>
                            Loading data...
                        </Text>
                    }
                />
            </View>
        </View>
    );
};

const localStyles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  emptyListText: {
    textAlign: 'center', padding: 20, color: 'gray'
  }
});

export default InfoTrendCurrencies;