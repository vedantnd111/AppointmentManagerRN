import { Vendor } from './VendorModel';

const MOCK_VENDORS: Vendor[] = [
    {
        id: '1',
        name: "Gentlemen's Cut",
        rating: 4.8,
        address: '123 Main St, City',
        category: 'Barber',
        imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80', // Placeholder image
        isOpen: true,
        nextAvailableSlot: 'Today, 2:30 PM',
        services: [
            { id: 's1', name: 'Haircut', price: 25, durationMinutes: 30 },
            { id: 's2', name: 'Beard Trim', price: 15, durationMinutes: 20 },
            { id: 's3', name: 'Full Shave', price: 30, durationMinutes: 45 },
        ]
    },
    {
        id: '2',
        name: "Urban Style Salon",
        rating: 4.5,
        address: '456 Market St, City',
        category: 'Salon',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
        isOpen: true,
        nextAvailableSlot: 'Tomorrow, 10:00 AM',
        services: [
            { id: 's4', name: 'Haircut', price: 40, durationMinutes: 45 },
            { id: 's5', name: 'Coloring', price: 80, durationMinutes: 90 },
        ]
    }
];

export const VendorService = {
    getVendors: (): Promise<Vendor[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VENDORS), 500); // Simulate network delay
        });
    },

    getVendorById: (id: string): Promise<Vendor | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_VENDORS.find(v => v.id === id)), 300);
        });
    },

    getAvailableSlots: (vendorId: string, serviceId: string): Promise<string[]> => {
        return new Promise((resolve) => {
            // Mock slots generation
            const slots = [];
            const startHour = 10;
            const endHour = 20;
            for (let h = startHour; h < endHour; h++) {
                slots.push(`${h}:00`);
                slots.push(`${h}:30`);
            }
            setTimeout(() => resolve(slots), 300);
        });
    }
};
