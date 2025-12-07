export interface Service {
    id: string;
    name: string;
    price: number;
    durationMinutes: number;
}

export interface Vendor {
    id: string;
    name: string;
    rating: number;
    address: string;
    category: string;
    imageUrl: string; // URL or local require path
    isOpen: boolean;
    nextAvailableSlot: string;
    services: Service[];
}
