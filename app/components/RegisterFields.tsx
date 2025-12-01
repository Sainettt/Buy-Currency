import React from 'react';
import { View, Text, TextInput } from 'react-native';
import LoginFields from './LogInFields';
import { authStyles } from '../styles/authStyles';

const RegisterFields: React.FC = () => {
    return (
        <View style={authStyles.containerFields}>
            <LoginFields />
            <Text style={authStyles.fieldsName}>confirm password</Text>
            <TextInput style={authStyles.fields} placeholder="Confirm your password" secureTextEntry />
        </View>
    )
}

export default RegisterFields;