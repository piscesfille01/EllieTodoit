import { Auth } from "aws-amplify";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Welcome() {
    return (
        <View style={css.container}>
            
            <Text style={css.headerTxt}>Todoit!</Text>

            <View style={css.subContainer}>
                <Pressable onPress={() => Auth.federatedSignIn({
                    provider: "LoginWithGoogle"
                })}>
                    <View style={css.loginContainer}>
                        <Text style={css.loginTxt}>Continue with Google</Text>
                    </View>
                </Pressable>

                <Pressable>
                    <View style={css.loginContainer}>
                        <Text style={css.loginTxt}>Continue with Apple</Text>
                    </View>
                </Pressable>

                <Pressable>
                    <View style={css.loginContainer}>
                        <Text style={css.loginTxt}>Continue with Email</Text>
                    </View>
                </Pressable>
            </View>

        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EB7A53',
        paddingHorizontal: 40,
        paddingVertical: 130,
    },
    headerTxt: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        gap: 10,
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: '3',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        width: 350,
    },
    loginTxt: {
        fontSize: 15,
        fontWeight: '600',
    }
})