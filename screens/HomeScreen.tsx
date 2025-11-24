import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import TopBar from '../components/TopBar';
import VendorCard from '../view/VendorCard';
import { VendorService } from '../data/VendorService';
import { Vendor } from '../data/VendorModel';

export default function HomeScreen() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadVendors();
    }, []);

    const loadVendors = async () => {
        const data = await VendorService.getVendors();
        setVendors(data);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TopBar />
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {loading ? (
                    <ActivityIndicator size="large" color="#00AA00" style={styles.loader} />
                ) : (
                    vendors.map((vendor) => (
                        <VendorCard key={vendor.id} vendor={vendor} />
                    ))
                )}
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
    scrollContent: {
        padding: 16,
    },
    loader: {
        marginTop: 50,
    },
});
