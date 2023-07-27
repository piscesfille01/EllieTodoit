import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Settings() {
    
    return (
        <View style={css.container}>
            <Text>
                Settings Page
            </Text>
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