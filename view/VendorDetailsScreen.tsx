import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { VendorService } from '../data/VendorService';
import { Vendor } from '../data/VendorModel';
import TimeSlotModal from './TimeSlotModal';

type VendorDetailsRouteProp = RouteProp<RootStackParamList, 'VendorDetails'>;

export default function VendorDetailsScreen() {
    const route = useRoute<VendorDetailsRouteProp>();
    const navigation = useNavigation();
    const { vendorId } = route.params;
    const [vendor, setVendor] = useState<Vendor | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [slots, setSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        loadVendor();
    }, [vendorId]);

    const loadVendor = async () => {
        const data = await VendorService.getVendorById(vendorId);
        setVendor(data || null);
        setLoading(false);
    };

    const handleServicePress = async (serviceId: string) => {
        setSelectedService(serviceId);
        setModalVisible(true);
        setLoadingSlots(true);
        const availableSlots = await VendorService.getAvailableSlots(vendorId, serviceId);
        setSlots(availableSlots);
        setLoadingSlots(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00AA00" />
            </View>
        );
    }

    if (!vendor) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Vendor not found</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Image source={{ uri: vendor.imageUrl }} style={styles.coverImage} />

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{vendor.name}</Text>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.star}>★</Text>
                            <Text style={styles.rating}>{vendor.rating}</Text>
                        </View>
                    </View>

                    <Text style={styles.address}>{vendor.address}</Text>

                    <View style={styles.statusContainer}>
                        {vendor.isOpen ? (
                            <Text style={styles.openBadge}>Open Now</Text>
                        ) : (
                            <Text style={styles.closedBadge}>Closed</Text>
                        )}
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.category}>{vendor.category}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Services</Text>

                    <View style={styles.servicesList}>
                        {vendor.services.map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                style={styles.serviceItem}
                                onPress={() => handleServicePress(service.id)}
                            >
                                <View style={styles.serviceInfo}>
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                    <Text style={styles.serviceDuration}>{service.durationMinutes} min</Text>
                                </View>
                                <View style={styles.serviceAction}>
                                    <Text style={styles.servicePrice}>${service.price}</Text>
                                    <View style={styles.bookServiceButton}>
                                        <Text style={styles.bookServiceButtonText}>Book</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <TimeSlotModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                slots={slots}
                loading={loadingSlots}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 18,
        marginBottom: 16,
    },
    backText: {
        color: '#00AA00',
        fontSize: 16,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    coverImage: {
        width: '100%',
        height: 250,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 1,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    star: {
        color: '#FFD700',
        fontSize: 14,
        marginRight: 4,
    },
    rating: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    openBadge: {
        color: '#00AA00',
        fontWeight: 'bold',
    },
    closedBadge: {
        color: '#FF0000',
        fontWeight: 'bold',
    },
    dot: {
        color: '#888',
        marginHorizontal: 8,
    },
    category: {
        color: '#CCC',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    servicesList: {
        gap: 12,
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        padding: 16,
        borderRadius: 12,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    serviceDuration: {
        fontSize: 12,
        color: '#888',
    },
    serviceAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    bookServiceButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#00AA00',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookServiceButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
