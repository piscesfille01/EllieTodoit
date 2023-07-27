import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { Auth } from "aws-amplify";

export default function PwReset() {

    const navigation = useNavigation();

    const route = useRoute();
    const { userEmail } = route.params;

    const [code, setCode] = useState('');
    const [isSuccessful, setIsSucessful] = useState(false);
    const [newPw, setNewPw] = useState('');

    const verifyCode = () => {
        Auth.forgotPasswordSubmit(userEmail, code, newPw)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        setIsSucessful(true);
    }

    useEffect(() => {
        if (isSuccessful) {
            navigation.navigate('ResetPw');
        }
    }, [setIsSucessful, navigation]);

    return(
        <View style={css.container}>
            <Text style={css.verifyEmoji}>🔍</Text>
            <Text style={css.verifyTxt}>Reset your password </Text>
            <View style={css.subTxtContainer}>
                <Text style={css.subTxt}>We've sent a code to </Text>
                <Text style={css.userEmailTxt}> { userEmail }</Text>
            </View>

            <Text style={css.subTxt2}>Verification Code</Text>
            <View style={css.verifyContainer}>
                <TextInput
                    style={css.verifyInput}
                    onChangeText={newPw}
                    keyboardType="numeric"
                    placeholder="Enter your verification code" />
            </View>
            
            <Text style={css.subTxt2}>Reset Password</Text>
            <View style={css.pwContainer}>
                <TextInput
                    style={css.pwInput}
                    onChangeText={setNewPw}
                    keyboardType="numeric"
                    placeholder="Enter your new password" />
            </View>

            <View style={css.pwContainer2}>
                <TextInput
                    style={css.pwInput}
                    onChangeText={setNewPw}
                    keyboardType="numeric"
                    placeholder="Re-enter your new password" />
            </View>

            <Pressable onPress={verifyCode} >
                <View style={css.verifyBtn1}>
                    <Text style={css.verifyBtnTxt}>Reset</Text>
                </View>
            </Pressable>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 130,
    },
    verifyEmoji: {
        fontSize: 40,
    },
    verifyTxt: {
        marginTop: 10,
        fontSize: 27,
        fontWeight: "600",
    },
    subTxtContainer: {
        marginTop: 7,
        flexDirection: "row",
        alignItems: "center",
    },
    subTxt: {
        fontSize: 11,
    },
    userEmailTxt: {
        fontSize: 11,
        fontWeight: "500",
        textDecorationLine: "underline",
    },
    verifyContainer: {
        marginTop: 10,
        borderRadius: 5,
        padding: 12,
        paddingVertical: 17,
        backgroundColor: '#e0e0e0'
    },
    verifyInput: {
        fontSize: 13,
    },
    verifyBtn1: {
        marginTop: 30,
        backgroundColor: 'black',
        borderRadius: 23,
        alignSelf: 'center',
        padding: 15,
    },
    verifyBtnTxt: {
        fontSize: 15,
        fontWeight: 600,
        color: 'white'
    },
    pwContainer: {
        marginTop: 10,
        borderRadius: 5,
        padding: 12,
        paddingVertical: 17,
        backgroundColor: '#e0e0e0'
    },
    pwContainer2: {
        marginTop: 10,
        borderRadius: 5,
        padding: 12,
        paddingVertical: 17,
        backgroundColor: '#e0e0e0'
    },
    pwInput: {
        fontSize: 13,
    },
    subTxt2: {
        marginTop: 20,
        fontSize: 12,
    }
})