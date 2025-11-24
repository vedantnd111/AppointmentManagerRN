import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <TopBar />
            <ScrollView style={styles.content}>
                {/* Content will go here */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    content: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
});
