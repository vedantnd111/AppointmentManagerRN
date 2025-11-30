/**
 * Vendor Service - Handles all vendor-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/vendors';

export interface AddressDTO {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: 'HOME' | 'WORK' | 'BUSINESS' | 'OTHER';
}

export interface VendorProfileRequest {
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  bio?: string;
  profilePictureUrl?: string;
  address?: AddressDTO;
  categoryId: number;
  isActive: boolean;
}

export interface VendorProfileResponse {
  id: number;
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  bio?: string;
  profilePictureUrl?: string;
  address?: AddressDTO;
  categoryId: number;
  isActive: boolean;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorAvailabilityRequest {
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface VendorAvailabilityResponse {
  id: number;
  vendorId: number;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export class VendorService {
  /**
   * Create a new vendor
   */
  static async createVendor(request: VendorProfileRequest): Promise<VendorProfileResponse> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create vendor: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get vendor by ID
   */
  static async getVendorById(id: number): Promise<VendorProfileResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch vendor: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all vendors
   * @param categoryId - Optional filter by category ID
   */
  static async getAllVendors(categoryId?: number): Promise<VendorProfileResponse[]> {
    const url = categoryId ? `${BASE_URL}?categoryId=${categoryId}` : BASE_URL;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch vendors: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update a vendor
   */
  static async updateVendor(id: number, request: VendorProfileRequest): Promise<VendorProfileResponse> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update vendor: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a vendor
   */
  static async deleteVendor(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete vendor: ${response.statusText}`);
    }
  }

  /**
   * Add availability for a vendor
   */
  static async addAvailability(
    vendorId: number,
    request: VendorAvailabilityRequest
  ): Promise<VendorAvailabilityResponse> {
    const response = await fetch(`${BASE_URL}/${vendorId}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to add vendor availability: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get vendor availability
   */
  static async getVendorAvailability(vendorId: number): Promise<VendorAvailabilityResponse[]> {
    const response = await fetch(`${BASE_URL}/${vendorId}/availability`);

    if (!response.ok) {
      throw new Error(`Failed to fetch vendor availability: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update vendor availability
   */
  static async updateAvailability(
    vendorId: number,
    availabilityId: number,
    request: VendorAvailabilityRequest
  ): Promise<VendorAvailabilityResponse> {
    const response = await fetch(`${BASE_URL}/${vendorId}/availability/${availabilityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update vendor availability: ${response.statusText}`);
    }

    return response.json();
  }
}
