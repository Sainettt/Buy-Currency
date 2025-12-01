import React, { useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import LoginFields from '../../components/LogInFields';
import AuthAskText from '../../components/AuthAskText';
import { authStyles } from '../../styles/authStyles';
import AuthSubmitButton from '../../components/AuthSubmitButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../src/navigation/authTypes';
import { AuthContext } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
  const {setIsLoggedIn} = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authStyles.container}>
        <LoginFields />
        <AuthSubmitButton buttonText="Sign In" onPress={() => {setIsLoggedIn(true)}}/>
        <AuthAskText
          mainText="Don`t have an account yet? "
          buttonText="Sign Up"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
