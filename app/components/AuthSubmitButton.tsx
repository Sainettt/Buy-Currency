import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {authStyles} from "../styles/authStyles";
type Props = {
    buttonText: string
    onPress: () => void
}

const AuthSubmitButton: React.FC<Props> = ({ buttonText, onPress }) => {
    return (
        <View>
            <TouchableOpacity style={authStyles.authSubmitButton} onPress={onPress}>
                <Text style={authStyles.authSubmitButtonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AuthSubmitButton;