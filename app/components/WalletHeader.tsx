import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TotalBalance from './TotalBalance';

type Props = {
  balance: string;
  loading?: boolean;
  onTopUpPress: () => void;
};

const WalletHeader: React.FC<Props> = ({ balance, loading = false, onTopUpPress }) => {
  return (
    <View style={styles.headerWrapper}>
      <TotalBalance 
        balance={balance} 
        loading={loading} 
        onTopUpPress={onTopUpPress} 
      />

      {/* ГЛАВНОЕ ИСПРАВЛЕНИЕ:
         Мы создаем строку, которая точно повторяет структуру WalletAssetItem.
         Три колонки, каждая flex: 1.
      */}
      <View style={styles.tableHeaderRow}>
        
        {/* 1. Левая колонка (Coin) - выравнивание влево */}
        <View style={styles.leftSide}>
          <Text style={styles.columnHeaderText}>Coin</Text>
        </View>

        {/* 2. Центральная колонка (Holdings) - выравнивание по центру */}
        <View style={styles.centerSide}>
          <Text style={styles.columnHeaderText}>Holdings</Text>
        </View>

        {/* 3. Правая колонка (Value) - выравнивание вправо */}
        <View style={styles.rightSide}>
          <Text style={styles.columnHeaderText}>Value</Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    marginBottom: 5,
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 16,            
    fontFamily: 'Poppins-Bold', 
    color: '#FFFFFF',  
    paddingHorizontal: 10,      
  },
  
  // Контейнер строки заголовков
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10, // Важно: такой же паддинг, как в WalletAssetItem
    marginBottom: 5,
    marginTop: 30,
    borderBottomWidth: 1, // Опционально: можно добавить линию под заголовками
    borderBottomColor: '#4A4A4A',
  },

  // Стили колонок - ТОЧНАЯ КОПИЯ из WalletAssetItem
  leftSide: {
    flex: 1,
    alignItems: 'flex-start', // Прижато влево
  },
  centerSide: {
    flex: 1,
    alignItems: 'center', // По центру
  },
  rightSide: {
    flex: 1,
    alignItems: 'flex-end', // Прижато вправо
  },

  columnHeaderText: {
    color: '#FFFFFF', // Серый цвет для заголовков таблицы (так профессиональнее)
    fontFamily: 'Poppins-Bold',
    fontSize: 14,     // Чуть меньше чем основной текст
  },
});

export default WalletHeader;