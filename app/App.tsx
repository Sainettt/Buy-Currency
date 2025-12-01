import React from 'react'
import { View } from 'react-native'
import RootNavigator from './navigators/RootNavigator';
import { authStyles } from './styles/authStyles';
const App = () => {

  return (
    <View style={authStyles.appContainer}>
      <RootNavigator />
    </View>
  );
}



export default App;
