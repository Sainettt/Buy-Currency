import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { appStyles } from '../styles/appStyles';

type TotalBalanceProps = {
    balance: string;
    changeValue?: string;
    changePercent?: string;
    onTopUpPress: () => void;
    loading: boolean;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ 
    balance, 
    changeValue = "0.00", 
    changePercent = "0.00", 
    onTopUpPress, 
    loading 
}) => {
    
    const isPositive = parseFloat(changeValue) >= 0;
    const sign = isPositive && parseFloat(changeValue) > 0 ? '+' : '';
    const color = isPositive ? '#83EDA6' : '#EB5B5B';

    return (
        <View>
            <View style={appStyles.totalBalanceContainer}>
                <Text style={appStyles.totalBalanceText}>Total balance</Text>
            </View>
            
            <View style={styles.container}>
                <View style={styles.textBlock}>
                    {loading ? (
                         <ActivityIndicator size="large" color="#83EDA6" style={{marginLeft: 20}} />
                    ) : (
                        <>
                            {/* Основной баланс */}
                            <Text style={styles.balanceText}>{balance}$</Text>
                            
                            {/* Новая строка PnL */}
                            <View style={styles.pnlContainer}>
                                <Text style={styles.pnlLabel}>PnL Today: </Text>
                                <Text style={[styles.pnlValue, { color }]}>
                                    {sign}{changeValue}$ ({sign}{changePercent}%)
                                </Text>
                            </View>
                        </>
                    )}
                </View>

                <TouchableOpacity style={appStyles.topUpButton} onPress={onTopUpPress}>
                    <Text style={appStyles.topUpText}>Top Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    textBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    balanceText: {
        fontSize: 40,
        fontFamily: 'Poppins-Bold',
        color: '#FFFFFF',
        includeFontPadding: false,
        lineHeight: 48,
    },
    pnlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -5,
        marginLeft: 5,
    },
    pnlLabel: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#AAAAAA',
    },
    pnlValue: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    }
});

export default TotalBalance;