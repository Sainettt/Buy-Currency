import React from 'react'
import { View, FlatList} from 'react-native'
import BottomBar from '../../components/BottomBar'
import { appStyles } from '../../styles/appStyles'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../src/navigation/appTypes'
import UpperTextScreen from '../../components/UpperTextScreen'

type AllCurrenciesProps = NativeStackScreenProps<AppStackParamList, 'AllCurrencies'>;

const AllCurrenciesScreen: React.FC<AllCurrenciesProps> = ({ navigation }   ) => {
    return (
        <View style={appStyles.flexContainer}>
            <View style={appStyles.containerWithoutPadding}>
            <UpperTextScreen title="All Currencies" onPress={() => navigation.goBack()} />
            <FlatList>

            </FlatList>
            </View>
            <BottomBar homePress={() => navigation.navigate('Main')} walletPress={() => {}} transactionPress={() => {}} />
        </View>
    )
}
export default AllCurrenciesScreen