import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    const welcomeAnim = useRef(new Animated.Value(0)).current;
    const subTxtAnim = useRef(new Animated.Value(0)).current;
    const signInButtonAnim = useRef(new Animated.Value(0)).current;
    const signUpButtonAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(welcomeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(subTxtAnim, {
                toValue: 1,
                duration: 1500,
                delay: 400, // Wait for 2 seconds before starting the sub welcome text fade-in
                useNativeDriver: true,
            }),
            Animated.timing(signInButtonAnim, {
                toValue: 1,
                duration: 1500,
                delay: 200, 
                useNativeDriver: true,
            }),
            Animated.timing(signUpButtonAnim, {
                toValue: 1,
                duration: 1500,
                delay: 200, 
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={css.container}>
            <Animated.Text style={[css.emoji, { opacity: welcomeAnim }]}>👏🏻</Animated.Text>
            <Animated.Text style={[css.welcomeTxt, { opacity: welcomeAnim }]}>
                Welcome!
            </Animated.Text>
            <Animated.Text style={[css.subWelcomeTxt, { opacity: subTxtAnim }]}>
                Start your empowering productivity journey ✨
            </Animated.Text>

            <View style={css.subContainer}>
                <Animated.View style={[css.accButton1, { opacity: signInButtonAnim }]}>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={css.accTxt}>
                            Log in to existing account
                        </Text>
                    </Pressable>
                </Animated.View>

                <Animated.View style={[css.accButton2, { opacity: signUpButtonAnim }]}>
                    <Pressable onPress={() => navigation.navigate('Signup')}>
                        <Text style={css.accTxt}>
                            Create a new account
                        </Text>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 45,
        paddingVertical: 140,
    },
    emoji: {
        fontSize: 50,
    },
    welcomeTxt: {
        fontSize: 50,
        fontWeight: '600',
    },
    subWelcomeTxt: {
        fontSize: 17,
        fontWeight: '400',
        marginTop: 10,
        marginStart: 3,
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    accButton1: {
        backgroundColor: '#D3D3D3',
        marginTop: 350,
        padding: 15,
        borderRadius: 13,
        width: 270,
    },
    accButton2: {
        backgroundColor: '#D3D3D3',
        marginTop: 20,
        padding: 15,
        borderRadius: 13,
        width: 270,
    },
    accTxt: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
    }
});
