import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    intervals: string[];                // ['1H', '1D', ...]
    selectedInterval: string;           // Текущий выбранный
    onSelect: (interval: string) => void; // Функция при нажатии
};

export const IntervalSelector: React.FC<Props> = ({ intervals, selectedInterval, onSelect }) => {
    return (
        <View style={styles.intervalsContainer}>
            {intervals.map((interval) => (
                <TouchableOpacity
                    key={interval}
                    style={[
                        styles.intervalButton,
                        selectedInterval === interval && styles.activeIntervalButton
                    ]}
                    onPress={() => onSelect(interval)}
                >
                    <Text style={[
                        styles.intervalText,
                        selectedInterval === interval && styles.activeIntervalText
                    ]}>
                        {interval}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    intervalsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 10
    },
    intervalButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'transparent',
    },
    activeIntervalButton: {
        backgroundColor: '#3C3C3C',
    },
    intervalText: {
        color: '#777',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    },
    activeIntervalText: {
        color: '#FFFFFF',
    },
});