import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { appStyles } from '../styles/appStyles';

const InfoTrendCurrencies: React.FC = () => {
    return (
        <View>
            <View style={appStyles.infoTrendHeaderContainer}>
                <Text style={appStyles.infoTrendHeaderText}>Trending</Text>
                <Text style={appStyles.infoPriceHeaderText}>Last Price</Text>
                <Text style={appStyles.infoPriceHeaderText}>24h chg%</Text>
            </View>
            <View style={appStyles.trendHeaderContainer}>
                <FlatList>
                    
                </FlatList>
            </View>
        </View>
    )
}
export default InfoTrendCurrencies;