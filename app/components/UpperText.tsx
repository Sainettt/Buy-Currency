
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { appStyles } from '../styles/appStyles';

type UpperTextScreenProps = {
    title: string;
    onPress: () => void;
}
const UpperText: React.FC<UpperTextScreenProps> = ({ title, onPress })=> {
  return (
    <View style={appStyles.upperTextContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={appStyles.backButton}
      >
        <Image
          source={require('../assets/images/arrow.png')}
          style={styles.imageContainer}
        />
      </TouchableOpacity>
      <Text style={appStyles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 20, height: 15
  }
});
export default UpperText;
