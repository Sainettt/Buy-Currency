import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Определяем интерфейс прямо тут или импортируем из types.ts
type Asset = {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  change: number;
};

type Props = {
  item: Asset;
  onPress?: (item: Asset) => void;
};

const WalletAssetItem: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.itemContainer} 
      onPress={() => onPress && onPress(item)}
    >
      {/* ЛЕВАЯ ЧАСТЬ: Символ (ETH, USD) */}
      <View style={styles.leftSide}>
        <Text style={styles.assetSymbol}>{item.symbol}</Text>
      </View>

      {/* ЦЕНТР: Количество */}
      <View style={styles.centerSide}>
        <Text style={styles.assetAmount}>{item.amount}</Text>
      </View>

      {/* ПРАВАЯ ЧАСТЬ: Стоимость */}
      <View style={styles.rightSide}>
        <Text style={styles.assetValue}>
          {item.value.toFixed(2).replace('.', ',')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15, // Отступы сверху и снизу
    paddingHorizontal: 10,
    // Убрали backgroundColor и borderRadius (прямоугольник)
    // Добавили тонкую линию снизу для разделения
    borderBottomWidth: 1,
    borderBottomColor: '#4A4A4A', 
  },
  leftSide: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSide: {
    flex: 1,
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
    alignItems: 'flex-end',
  },
  assetSymbol: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  assetAmount: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  assetValue: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});

export default WalletAssetItem;