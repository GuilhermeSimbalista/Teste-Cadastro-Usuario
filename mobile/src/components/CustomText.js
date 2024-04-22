import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CustomText({ label,  text, onPress}) {
    return(
        <View style={styles.container}>
            <Text
                style={styles.text}
                > {text} </Text>
            <TouchableOpacity
                onPress={ onPress }
                style={styles.button}>
            <Text style={styles.label}
                > {label} </Text>
            </TouchableOpacity>
        </View>
    )}

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            flexDirection: "column",
            marginBottom: 30
        },
        text: {
            fontSize: 17,
            fontWeight: '600',
        },
        label: {
            fontSize: 20,
            fontWeight: '700',
            color: '#007bff',
            marginTop: 5
        }
    })