import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { AuthContext } from '../context/AuthContext';


const RootNavigator: React.FC = () => {
  const { isLoggedIn, isSplashLoading } = useContext(AuthContext);
  
  if (isSplashLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="#83EDA6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  spinner: {flex: 1, justifyContent: 'center', alignItems: 'center'}
})
export default RootNavigator;
