import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function EntryScreen() {
    return (
        <View style={styles.container} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue', // Set the background color to red
    },
});
