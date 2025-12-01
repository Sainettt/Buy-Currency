import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { authStyles } from "../styles/authStyles";

type Props = {
    mainText: string;
    buttonText: string;
    onPress?: () => void;
}

const AuthAskText: React.FC<Props> = ({ mainText, buttonText, onPress }) => {
    return (
        <View style={authStyles.authAskTextContainer}>
            <Text style={authStyles.mainAskText}>{mainText}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={authStyles.buttonAskText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthAskText;