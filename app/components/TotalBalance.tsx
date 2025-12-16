import React from 'react';
import { View, Text,ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { appStyles } from '../styles/appStyles';

type TotalBalanceProps = {
    balance: string;
    onTopUpPress: () => void;
    loading: boolean;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ balance, onTopUpPress, loading }) => {
    return (
        <View style={style.marginContainer}>
            <View style={appStyles.totalBalanceContainer}>
                      <Text style={appStyles.totalBalanceText}>Total balance</Text>
                    </View>
                    <View style={appStyles.balanceContainer}>
                      {loading ? (
                        <View style={appStyles.indicatorStyle}>
                            <ActivityIndicator size="large" color="#83EDA6" />
                         </View>
                      ) : (
                        <Text style={appStyles.balanceText}>{balance}$</Text>
                      )}
                      <TouchableOpacity
                        style={appStyles.topUpButton}
                        onPress={onTopUpPress}
                      >
                        <Text style={appStyles.topUpText}>Top Up</Text>
                      </TouchableOpacity>
                    </View>
        </View>
    )
}
const style = StyleSheet.create({
    marginContainer: {
        marginBottom: 15,
    }
})
export default TotalBalance;