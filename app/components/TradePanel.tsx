import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

type TradeType = 'buy' | 'sell';

export const TradePanel = () => {
    const [type, setType] = useState<TradeType>('buy');
    const [amount, setAmount] = useState('');

    const isBuy = type === 'buy';

    return (
        <View style={styles.container}>
            {/* Переключатель Buy / Sell */}
            <View style={styles.switchContainer}>
                <TouchableOpacity 
                    style={[styles.switchButton, isBuy && styles.activeBuyButton]} 
                    onPress={() => setType('buy')}
                >
                    <Text style={[styles.switchText, isBuy && styles.activeText]}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.switchButton, !isBuy && styles.activeSellButton]} 
                    onPress={() => setType('sell')}
                >
                    <Text style={[styles.switchText, !isBuy && styles.activeText]}>Sell</Text>
                </TouchableOpacity>
            </View>

            {/* Инпут ввода */}
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    placeholder="0" 
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <Text style={styles.currencySuffix}>USD</Text>
            </View>

            {/* Главная кнопка действия */}
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: isBuy ? '#83EDA6' : '#EB5B5B' }]}>
                <Text style={styles.actionButtonText}>
                    {isBuy ? 'Buy' : 'Sell'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2A2A2A', // Чуть светлее фона экрана
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        marginTop: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        backgroundColor: '#3C3C3C',
        borderRadius: 10,
        padding: 4,
        marginBottom: 20,
    },
    switchButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeBuyButton: { backgroundColor: '#83EDA6' }, // Зеленый для покупки
    activeSellButton: { backgroundColor: '#EB5B5B' }, // Красный для продажи
    switchText: {
        fontFamily: 'Poppins-Bold',
        color: '#777',
    },
    activeText: { color: '#1E1E1E' }, // Темный текст на активной кнопке
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3C3C3C',
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 60,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#555'
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
    },
    currencySuffix: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    actionButton: {
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#1E1E1E',
    }
});