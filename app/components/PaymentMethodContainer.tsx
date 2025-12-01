import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';

interface PaymentMethodContainerProps {
  logo: ImageSourcePropType;
  styleLogo?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

const PaymentMethodContainer: React.FC<PaymentMethodContainerProps> = ({ logo, styleLogo, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftContent}>
        <Image source={logo} style={styleLogo} />
      </View>
      <Image source={require('../assets/images/arrowPayment.png')}
          style={{ width: 15, height: 15 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 290,
    height: 80,
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#636363',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoApplePayContainer: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  logoBlikContainer: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  methodName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold', 
    color: '#FFFFFF',
    fontWeight: '700',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default PaymentMethodContainer;