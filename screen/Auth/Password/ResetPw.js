import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ResetPw() {

    return (
        <View style={css.container}>
            <Text> PW RESET </Text>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})