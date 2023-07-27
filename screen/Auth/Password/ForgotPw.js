import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Auth } from "aws-amplify";

export default function ForgotPw() {
    
    const navigation = useNavigation();

    const [userEmail, setUserEmail] = useState('');
    const [sendSuccess, setSendSuccess] = useState(false);

    const sendEmail = () => {
        Auth.forgotPassword(userEmail)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
        setSendSuccess(true);
    }

    useEffect(() => {
        if (sendSuccess) {
            navigation.navigate('PwReset', { userEmail });
        }
    }, [sendSuccess, navigation]);

    return(
        <View style={css.container}>
            <Text style={css.emoji}>🔐 </Text>
            <Text style={css.forgotTxt}>Reset password</Text>
            <Text style={css.forgotSubTxt}>Enter your registered email below to receive password reset instruction</Text>

            <View style={css.emailContainer}>
                <TextInput
                    style={css.emailInput}
                    onChangeText={setUserEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Enter your registered email" />
            </View>

            <View style={css.subTxtContainer}>
                <Text style={css.subTxt}>Remember password?</Text>
                <Pressable onPress={() => { navigation.navigate("Login") }}>
                    <Text style={css.loginLink}>Log in</Text>
                </Pressable>
            </View>

            <Pressable onPress={sendEmail}>
                <View style={css.sendBtn}>
                    <Text style={css.sendTxt}>Send</Text>
                </View>
            </Pressable>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 45,
        paddingVertical: 130,
    },
    emoji: {
        fontSize: 40,
    },
    forgotTxt: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: 600,
    },
    forgotSubTxt: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: 400,
    },
    emailContainer: {
        marginTop: 25,
        borderRadius: 5,
        padding: 12,
        paddingVertical: 17,
        backgroundColor: '#e0e0e0'
    },
    emailInput: {
        fontSize: 13,
    },
    subTxtContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    subTxt: {
        fontSize: 11,
        marginRight: 5,
    },
    loginLink: {
        fontSize: 11,
        fontWeight: "500",
        textDecorationLine: "underline",
    },
    sendBtn: {
        marginTop: 40,
        backgroundColor: 'black',
        borderRadius: 23,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignSelf: 'center',
    },
    sendTxt: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: 'white'
    },
})