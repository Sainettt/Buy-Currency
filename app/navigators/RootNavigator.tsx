import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import AuthNavigator from './AuthNavigator'
import { AuthContext } from '../context/AuthContext';
import AppNavigator from './AppNavigator';

const RootNavigator: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <NavigationContainer>
                {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
export default RootNavigator;