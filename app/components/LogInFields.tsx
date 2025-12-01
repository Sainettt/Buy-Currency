import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { authStyles } from '../styles/authStyles';
const LoginFields: React.FC = () => {
    return (
        <View style={authStyles.containerFields}>
            <Text style={authStyles.fieldsName}>username</Text>
            <TextInput style={authStyles.fields} placeholder="Enter your username" />
            <Text style={authStyles.fieldsName}>email</Text>
            <TextInput style={authStyles.fields} placeholder="Enter your email" />
            <Text style={authStyles.fieldsName}>password</Text>
            <TextInput style={authStyles.fields} placeholder="Enter your password" secureTextEntry />
        </View>
    )
}

export default LoginFields;