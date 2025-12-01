
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { appStyles } from '../styles/appStyles';

type UpperTextScreenProps = {
    title: string;
    onPress: () => void;
}
const UpperTextScreen: React.FC<UpperTextScreenProps> = ({ title, onPress })=> {
  return (
    <View style={appStyles.upperTextContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={appStyles.backButton}
      >
        <Image
          source={require('../assets/images/arrow.png')}
          style={{ width: 20, height: 15 }}
        />
      </TouchableOpacity>
      <Text style={appStyles.title}>{title}</Text>
    </View>
  );
};
export default UpperTextScreen;
