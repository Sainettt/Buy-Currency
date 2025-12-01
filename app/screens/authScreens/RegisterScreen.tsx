import React, { useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import AuthAskText from '../../components/AuthAskText';
import RegisterFields from '../../components/RegisterFields';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { authStyles } from '../../styles/authStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../src/navigation/authTypes';
import { AuthContext } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;
const RegisterScreen: React.FC<Props> = ({ navigation }: Props) => {
  const {setIsLoggedIn} = useContext(AuthContext);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authStyles.container}>
        <RegisterFields />
        <AuthSubmitButton buttonText="Sign Up" onPress={() => {setIsLoggedIn(true)}}/>
        <AuthAskText
          mainText="Already have an account? "
          buttonText="Sign In"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegisterScreen;
