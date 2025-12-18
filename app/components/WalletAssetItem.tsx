import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Asset = {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  price: number;
  change: number;
  changeValue?: number;
};

type Props = {
  item: Asset;
  onPress?: (item: Asset) => void;
};

const WalletAssetItem: React.FC<Props> = ({ item, onPress }) => {
  const isPositive = item.change >= 0;
  const sign = item.change > 0 ? '+' : '';
  const changeVal = item.changeValue ? item.changeValue.toFixed(2) : "0.00";

  const formatHoldings = (num: number) => {
    const str = num.toString();
    if (str.length > 8) return str.slice(0, 8).replace(/[.,]$/, '');
    return str;
  };

  return (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => onPress && onPress(item)}
    >
      <View style={styles.leftSide}>
        <Text style={styles.assetSymbol}>{item.symbol}</Text>
      </View>

      <View style={styles.centerSide}>
        <Text style={styles.assetAmount}>{formatHoldings(item.amount)}</Text>
      </View>

      <View style={styles.rightSide}>
        <Text style={styles.assetValue}>
          {item.value.toFixed(2).replace('.', ',')} $
        </Text>
        
        {item.symbol !== 'USD' && (
             <Text style={[styles.assetChange, { color: isPositive ? '#83EDA6' : '#EB5B5B' }]}>
                {sign}{changeVal}$ ({sign}{item.change.toFixed(2)}%)
             </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4A4A4A', 
  },
  leftSide: { flex: 1, alignItems: 'flex-start' },
  centerSide: { flex: 1, alignItems: 'center' },
  rightSide: { flex: 1, alignItems: 'flex-end' },
  
  assetSymbol: { fontSize: 20, fontFamily: 'Poppins-Regular', color: '#FFFFFF' },
  assetAmount: { fontSize: 18, fontFamily: 'Poppins-Regular', color: '#FFFFFF' },
  assetValue: { fontSize: 18, fontFamily: 'Poppins-Regular', color: '#FFFFFF' },
  
  assetChange: {
      fontSize: 12,
      fontFamily: 'Poppins-Medium',
      marginTop: 2,
  }
});

export default WalletAssetItem;