import React from "react";
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({ label, icon, keyboardType, text}) {
    return(
        <View style={styles.view}>
        <Text style={styles.text}>{icon} {text}</Text>
        <View style={styles.container}>
                <TextInput 
                placeholder={label}
                keyboardType={keyboardType}
                style={styles.input} />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        marginBottom: 25,
        width: '75%',
    },
    view: {
        alignItems: 'center'
    },
    text: {
        marginBottom: 3,
        marginLeft: 10,
        width: '75%',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#D8D8D8',
        flex: 1,
        padding: 10,
        borderRadius: 20,
        marginTop: 3
    }
})