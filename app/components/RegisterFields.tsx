import React from 'react';
import { View, Text, TextInput } from 'react-native';
import LoginFields from './LogInFields';
import { authStyles } from '../styles/authStyles';

type RegisterFieldsProps = {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
};
const RegisterFields: React.FC<RegisterFieldsProps> = ({ username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
    return (
        <View style={authStyles.containerFields}>
            <LoginFields
                username={username} 
                setUsername={setUsername}
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} 
            />
            <Text style={authStyles.fieldsName}>confirm password</Text>
            <TextInput style={authStyles.fields} placeholder="Confirm your password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>
    )
}

export default RegisterFields;