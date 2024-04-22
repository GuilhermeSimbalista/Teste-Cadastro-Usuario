import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function CustomButton ({ label, onPress}) {

    return (
        <View style={styles.container}>
        <TouchableOpacity
            onPress={ onPress }
            style={styles.button}>
                <Text
                    style={styles.text}>
                    { label }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        width: '75%',
        height: 38,
        borderRadius: 20,
        marginBottom: 25
    },
    text: {
        fontWeight: '700',
        fontSize: 20,
        color: '#ffffff'
    }
})
