import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Auth } from "aws-amplify";


export default function Signup() {
    
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [signupSuccess, setSignupSuccess] = useState(false);

    const SignUp = async () => {
        try {
            await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email: email,
                    given_name: firstName,
                    family_name: lastName,
                },
            });
            // console.log(user);
            setSignupSuccess(true);
        } catch (e) {
            console.log("Error Signing up:", e);
        }
    }

    useEffect(() => {
        if (signupSuccess) {
            navigation.navigate('EmailVerification', { email });
        }
    }, [signupSuccess, navigation]);
  
    return (
        <View style={css.container}>
            <Text style={css.signUpEmoji}>👋🏻</Text>
            <Text style={css.signUpTxt}>Create a new account</Text>
            <View style={css.subTxtContainer}>
                <Text style={css.subTxt}>Already have an account?</Text>
                <Pressable onPress={() => { navigation.navigate("Login") }}>
                    <Text style={css.loginLink}>Log In</Text>
                </Pressable>
            </View>

            <View style={css.createFormContainer}>
                
                <View style={css.nameContainer}>
                    <View style={css.inputContainer}>
                        <Text style={css.inputLabel}>First Name</Text>
                        <TextInput
                            style={css.textInput}
                            onChangeText={setFirstName}
                            placeholder=""
                        />
                    </View>
                    <View style={css.inputContainer}>
                        <Text style={css.inputLabel}>Last Name</Text>
                        <TextInput
                            style={css.textInput}
                            onChangeText={setLastName}
                            placeholder=""
                        />
                    </View>
                
                </View>

                <View style={css.emailContainer}>
                    <Text style={css.inputLabel}> Email </Text>
                    <TextInput
                        style={css.textInput}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        placeholder="" 
                    />
                </View>

                <View style={css.emailContainer}>
                    <Text style={css.inputLabel}> Password </Text>
                    <TextInput
                        style={css.textInput}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        placeholder="" 
                    />
                </View>

            </View>

            <Pressable onPress={SignUp}>
                <View style={css.createButton}>
                    <Text style={css.createTxt}>Create account</Text>
                </View>
            </Pressable>

        </View>
    );
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 130,
    },
    signUpEmoji: {
        fontSize: 40,
    },
    signUpTxt: {
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
        marginRight: 5,
    },
    loginLink: {
        fontSize: 11,
        fontWeight: "500",
        textDecorationLine: "underline",
    },
    createFormContainer: {
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 13,
      },
    inputContainer: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 11,
        padding: 11,
    },
    inputLabel: {
        fontSize: 10,
        fontWeight: '400',
        marginBottom: 5,
    },
    textInput: {
        fontSize: 14,
        fontWeight: '400',
    },
    emailContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 11,
        padding: 11,
        alignSelf: 'stretch',
        textAlign: 'left'
    },
    createButton: {
        marginTop: 40,
        backgroundColor: 'black',
        borderRadius: 27,
        alignSelf: 'center',
        paddingHorizontal: 30,
        paddingVertical: 17

    },
    createTxt: {
        fontSize: 15,
        fontWeight: 600,
        color: 'white'
    }
});
