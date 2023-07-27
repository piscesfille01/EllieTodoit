import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

export default function VerificationSuccess() {

    const subTxtAnim = useRef(new Animated.Value(0)).current;
    const loginBtnAnim = useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(subTxtAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(loginBtnAnim, {
                toValue: 1,
                duration: 1500,
                delay: 200, 
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return(
        <View style={css.container}>
            <Text style={css.verifyEmoji}>😆</Text>
            <Text style={css.verifyTxt}>Verification has been successful! </Text>
            <Animated.Text 
                style={[css.subTxt, { opacity: subTxtAnim }]}> Add some tasks for a more organized day 📝 
            </Animated.Text>

            <Animated.View style={[css.loginBtn, { opacity: loginBtnAnim }]}>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={css.accTxt}>
                        Log in
                    </Text>
                </Pressable>
            </Animated.View>

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
        fontSize: 40,
        fontWeight: "600",
    },
    subTxt: {
        marginTop: 15,
        fontSize: 15,
    },
    loginBtn: {
        backgroundColor: '#D3D3D3',
        marginTop: 350,
        padding: 15,
        borderRadius: 13,
    },
    accTxt: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
    }
})