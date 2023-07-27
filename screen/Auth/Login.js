import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import Dashboard from "../Dashboard";

export default function Login({user, setUser}) {

    

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const SignIn = async () => {
        try {
          await Auth.signIn(userEmail, userPassword);
          const currentUser = await Auth.currentAuthenticatedUser();
          setUser(currentUser);
          console.log("User log in successful!")
          navigation.navigate('Dashboard');
        } catch (e) {
          console.log("Error Signing in", e);
        }
      };

    const navigation = useNavigation();
    return (
        <View style={css.container}>
            <Text style={css.loginEmoji}>🔓 </Text>
            <Text style={css.loginTxt}>Login </Text>
            <Text style={css.subTxt1}>Welcome back! Please enter your details</Text>
            <View style={css.subTxtContainer}>
                <Text style={css.subTxt}>Don't have an account?</Text>
                <Pressable onPress={() => { navigation.navigate("Signup") }}>
                    <Text style={css.signupLink}>Sign up</Text>
                </Pressable>
            </View>

            <TextInput
                style={css.loginInput}
                onChangeText={setUserEmail}
                placeholder="Email"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />

            <TextInput
                style={css.loginInput}
                onChangeText={setUserPassword}
                placeholder="Password"
                autoCapitalize="none"
                underlineColorAndroid="transparent"
            />

            <Pressable onPress={SignIn}>
                <View style={css.loginButton}>
                    <Text style={css.loginTxt2}>Login</Text>
                </View>
            </Pressable>

            <View style={css.forgotPwContainer}>
                <Text style={css.subTxt2}>Forgot password?</Text>
                    <Pressable onPress={() => { navigation.navigate("ForgotPw") }}>
                        <Text style={css.pwLink}>Reset a password</Text>
                    </Pressable>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 45,
        paddingVertical: 130,
    },
    loginEmoji: {
        fontSize: 40,
    },
    loginTxt: {
        marginTop: 10,
        fontSize: 40,
        fontWeight: 600
    },
    subTxt1: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: 400,
    },
    loginInput: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontSize: 13,
        marginTop: 20,
        paddingVertical: 8,
        // marginHorizontal: 10,
    },
    subTxtContainer: {
        marginTop: 7,
        flexDirection: "row",
        alignItems: "center",
    },
    subTxt: {
        fontSize: 11,
        marginRight: 5,
    },
    signupLink: {
        fontSize: 11,
        fontWeight: "500",
        textDecorationLine: "underline",
    },
    loginButton: {
        marginTop: 40,
        backgroundColor: 'black',
        borderRadius: 23,
        // alignSelf: 'center',
        padding: 15,
    },
    loginTxt2: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 600,
        color: 'white'
    },
    forgotPwContainer: {
        marginTop: 15,
        flexDirection: "row",
        alignSelf: 'center',
        gap: 5,
    },
    subTxt2: {
        fontSize: 11,
    },
    pwLink: {
        fontSize: 11,
        fontWeight: "500",
        textDecorationLine: "underline",
    }
})
