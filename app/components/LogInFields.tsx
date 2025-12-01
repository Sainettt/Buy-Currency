import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { authStyles } from '../styles/authStyles';
type LoginFieldsProps = {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
};
const LoginFields: React.FC<LoginFieldsProps> = ({ username, setUsername, email, setEmail, password, setPassword }) => {
    return (
        <View style={authStyles.containerFields}>
            <Text style={authStyles.fieldsName}>username</Text>
            <TextInput style={authStyles.fields} placeholder="Enter your username" value={username} onChangeText={setUsername} />
            <Text style={authStyles.fieldsName}>email</Text>
            <TextInput style={authStyles.fields} placeholder="Enter your email" value={email} onChangeText={setEmail} />
            <Text style={authStyles.fieldsName}>password</Text>
            <TextInput style={authStyles.fields} placeholder="Enter your password" secureTextEntry value={password} onChangeText={setPassword} />
        </View>
    )
}

export default LoginFields;