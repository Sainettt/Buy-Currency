import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type Props = {
    data: any[];  
    loading: boolean;  
    isPositive: boolean; 
    width: number;     
};

export const CryptoChart: React.FC<Props> = ({ data, loading, isPositive, width }) => {
    
    const chartColor = isPositive ? '131, 237, 166' : '235, 91, 91';

    return (
        <View style={styles.chartContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#83EDA6" style={styles.indicator} />
            ) : (
                data.length > 0 && (
                    <LineChart
                        data={{
                            labels: [],
                            datasets: [{ data: data.map((d: any) => d.value) }]
                        }}
                        width={width}
                        height={220}
                        withDots={false}
                        withInnerLines={false}
                        withOuterLines={false}
                        withVerticalLabels={false}
                        withHorizontalLabels={false}
                        withShadow={false}
                        chartConfig={{
                            backgroundColor: "#3C3C3C",
                            backgroundGradientFrom: "#3C3C3C",
                            backgroundGradientTo: "#3C3C3C",
                            decimalPlaces: 2,
                            
                            fillShadowGradientFrom: "transparent",
                            fillShadowGradientTo: "transparent",
                            fillShadowGradientOpacity: 0,

                            color: (opacity = 1) => `rgba(${chartColor}, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForBackgroundLines: { strokeWidth: 0 }
                        }}
                        bezier
                        style={styles.positionChart}
                    />
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionChart: {
        marginTop: 20,
        borderRadius: 16,
        paddingRight: 0, 
        paddingLeft: 0, 
        marginLeft: 10 
    },
    indicator: {
        marginTop: 50,
    },
});