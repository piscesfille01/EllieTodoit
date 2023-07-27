import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";

export default function EmailVerification({ }) {

    const navigation = useNavigation();

    const route = useRoute();
    const { email } = route.params;

    const [code, setCode] = useState('');
    // const [verified, setVerified] = useState(false);

    const confirmSignUp = async () => {
        try {
          const response = await Auth.confirmSignUp(email, code);
          console.log(response);
          navigation.navigate('VerificationSuccess');
        } catch (e) {
          console.log("Error confirming sign up:", e);
        }
      };
      

    const ResendConfirmationCode = async () => {
        try {
            await Auth.resendSignUp(email);
            console.log('code resent successfully');
          } catch (err) {
            console.log('error resending code: ', err);
          }
    }

    return (
        <View style={css.container}>
            <Text style={css.verifyEmoji}>📧</Text>
            <Text style={css.verifyTxt}> Enter verification code </Text>
            <View style={css.subTxtContainer}>
                <Text style={css.subTxt}> We've sent a code to </Text>
                <Text style={css.userEmailTxt}> { email }</Text>
            </View>

            <View style={css.verifyContainer}>
                <TextInput
                    style={css.verifyInput}
                    onChangeText={setCode}
                    keyboardType="numeric"
                    placeholder="Enter your confirmation code" />
            </View>

            <Pressable onPress={confirmSignUp}>
                <View style={css.verifyBtn1}>
                    <Text style={css.verifyBtnTxt}> Verify </Text>
                </View>
            </Pressable>

            <Pressable onPress={ResendConfirmationCode}>
                <View style={css.verifyBtn2}>
                    <Text style={css.verifyBtnTxt}> Resend code </Text>
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
        marginTop: 25,
        borderRadius: 5,
        padding: 12,
        paddingVertical: 17,
        backgroundColor: '#e0e0e0'
    },
    verifyInput: {
        fontSize: 13,
    },
    verifyBtn1: {
        marginTop: 50,
        backgroundColor: 'black',
        borderRadius: 23,
        alignSelf: 'center',
        padding: 15,
    },
    verifyBtn2: {
        marginTop: 7,
        backgroundColor: 'black',
        borderRadius: 23,
        alignSelf: 'center',
        padding: 15,
    },
    verifyBtnTxt: {
        fontSize: 15,
        fontWeight: 600,
        color: 'white'
    }
})